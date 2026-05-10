// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title VidnovaEscrow
 * @notice Ескроу-контракт для прозорого збору коштів на проєкти відновлення України.
 * @dev Donation funds are held in escrow until milestone completion is verified
 *      by both the recipient NGO and an independent verifier (multisig pattern).
 *
 * Architecture:
 *   - Кожен проєкт відновлення = окремий escrow з визначеними етапами (milestones)
 *   - Донори надсилають USDT/USDC напряму до контракту
 *   - Кошти зберігаються в контракті до підтвердження виконання етапу
 *   - Після підтвердження двома сторонами кошти автоматично переказуються НГО
 *   - Усі події індексуються через The Graph для публічного дашборду
 *
 * Status: DRAFT — architecture sketch, not production-ready
 */
contract VidnovaEscrow is AccessControl, ReentrancyGuard {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant NGO_ROLE = keccak256("NGO_ROLE");

    enum MilestoneStatus { Pending, InProgress, Submitted, Approved, Released }

    struct Milestone {
        string description;       // "Покрівельні роботи"
        uint256 budget;            // у USDT (з 6 знаками)
        MilestoneStatus status;
        string reportIpfsHash;     // CID звіту в IPFS
        uint256 completedAt;
    }

    struct Project {
        string title;              // "Школа №17, Ізюм"
        address ngoRecipient;      // Верифікований гаманець НГО
        address verifier;          // Незалежний верифікатор
        uint256 targetAmount;      // Цільова сума
        uint256 raisedAmount;      // Зібрано
        uint256 createdAt;
        bool isActive;
        Milestone[] milestones;
    }

    // projectId => Project
    mapping(uint256 => Project) public projects;
    // projectId => donor => amount
    mapping(uint256 => mapping(address => uint256)) public donations;

    uint256 public projectCount;
    IERC20 public immutable stablecoin;  // USDT contract on BNB Chain

    event ProjectCreated(uint256 indexed projectId, address indexed ngo, uint256 target);
    event DonationReceived(uint256 indexed projectId, address indexed donor, uint256 amount);
    event MilestoneSubmitted(uint256 indexed projectId, uint256 milestoneIndex, string ipfsHash);
    event MilestoneApproved(uint256 indexed projectId, uint256 milestoneIndex);
    event FundsReleased(uint256 indexed projectId, uint256 milestoneIndex, uint256 amount);

    constructor(address _stablecoin, address _admin) {
        stablecoin = IERC20(_stablecoin);
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
    }

    /**
     * @notice Створення нового проєкту відновлення
     * @dev Тільки верифіковані НГО (NGO_ROLE) можуть створювати проєкти.
     *      Верифікація НГО відбувається off-chain через DID-атестацію.
     */
    function createProject(
        string calldata title,
        address ngoRecipient,
        address verifier,
        uint256 targetAmount,
        Milestone[] calldata initialMilestones
    ) external onlyRole(NGO_ROLE) returns (uint256 projectId) {
        // TODO: implementation
        // - validate milestone budgets sum equals targetAmount
        // - emit ProjectCreated
        // - return new projectId
    }

    /**
     * @notice Донат на проєкт
     * @dev Донор має попередньо approve() стейблкоїн для контракту.
     *      Сума передається з гаманця донора прямо в ескроу.
     *      Опціонально мінтиться SBT-сертифікат участі.
     */
    function donate(uint256 projectId, uint256 amount) external nonReentrant {
        // TODO: implementation
        // - require project active and not over target
        // - transferFrom(donor, this, amount)
        // - update donations mapping and raisedAmount
        // - mint SBT participation certificate (optional)
        // - emit DonationReceived
    }

    /**
     * @notice НГО подає звіт про виконання етапу
     * @dev Звіт зберігається в IPFS, hash фіксується on-chain.
     *      Чекає на підтвердження від verifier.
     */
    function submitMilestone(
        uint256 projectId,
        uint256 milestoneIndex,
        string calldata reportIpfsHash
    ) external {
        // TODO: implementation
        // - require msg.sender == project.ngoRecipient
        // - require milestone status == InProgress
        // - update status to Submitted
        // - emit MilestoneSubmitted
    }

    /**
     * @notice Верифікатор підтверджує виконання етапу
     * @dev Після підтвердження кошти етапу автоматично переказуються НГО.
     */
    function approveMilestone(
        uint256 projectId,
        uint256 milestoneIndex
    ) external onlyRole(VERIFIER_ROLE) nonReentrant {
        // TODO: implementation
        // - require status == Submitted
        // - update status to Approved
        // - call _releaseFunds internally
    }

    /**
     * @dev Внутрішня функція виплати коштів етапу.
     *      Не може бути викликана зовні — тільки після approveMilestone.
     */
    function _releaseFunds(uint256 projectId, uint256 milestoneIndex) internal {
        // TODO: implementation
        // - transfer milestone.budget to ngoRecipient
        // - update status to Released
        // - emit FundsReleased
    }

    /**
     * @notice Отримати інформацію про проєкт (для frontend)
     */
    function getProject(uint256 projectId) external view returns (
        string memory title,
        address ngo,
        uint256 target,
        uint256 raised,
        uint256 milestoneCount
    ) {
        Project storage p = projects[projectId];
        return (p.title, p.ngoRecipient, p.targetAmount, p.raisedAmount, p.milestones.length);
    }

    // -- Adminstrative functions --

    function verifyNgo(address ngo) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(NGO_ROLE, ngo);
    }

    function appointVerifier(address verifier) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(VERIFIER_ROLE, verifier);
    }
}

/**
 * Architectural notes:
 *
 * 1. Чому ескроу, а не прямий переказ?
 *    Прямий переказ донату = довіра до НГО на 100%.
 *    Ескроу = кошти в контракті до підтвердження виконання → знижує ризик зловживання.
 *
 * 2. Чому мультипідпис (NGO + Verifier)?
 *    Тільки НГО → можна "підтвердити" фейкове виконання.
 *    Тільки Verifier → НГО не контролює свій же звіт.
 *    Two-sig → балансує контроль і автономність.
 *
 * 3. SBT (soulbound tokens) для донорів — окремий контракт.
 *    Не торгується, не передається. Виключно атестація участі.
 *    Корисно для CSR-звітності корпоративних донорів.
 *
 * 4. Gas optimization (TODO):
 *    - Storage packing для Milestone struct
 *    - Batch donations для зменшення кількості транзакцій
 *    - Розглянути EIP-2612 permit для approve+donate в одній транзакції
 *
 * 5. Security considerations:
 *    - Reentrancy: захищено через nonReentrant + checks-effects-interactions
 *    - Front-running: не критично для донатів, але треба перевірити для milestone submission
 *    - Audit: перед mainnet деплоєм — обов'язковий зовнішній аудит (Hacken, OpenZeppelin)
 */
