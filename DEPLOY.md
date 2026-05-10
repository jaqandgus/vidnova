# Інструкція з деплою Vidnova на GitHub Pages

## Що в цьому пакеті

```
vidnova-package/
├── README.md                    # README для GitHub-репозиторію (журі це побачить)
├── package.json                 # Залежності та скрипти
├── vite.config.js               # Конфіг Vite з base="/vidnova/"
├── index.html                   # HTML-шаблон
├── .gitignore                   # Стандартний gitignore для React+Vite
├── src/
│   ├── App.jsx                  # Основний компонент (наш прототип)
│   └── main.jsx                 # React entry point
└── contracts/
    └── VidnovaEscrow.sol        # Smart contract draft (для посилення репо)
```

## Покрокова інструкція

### 1. Створи локальну папку та скопіюй файли

```bash
# на твоєму компі
mkdir vidnova
cd vidnova
# скопіюй всі файли з vidnova-package в цю папку
```

Структура має бути така:
```
vidnova/
├── README.md
├── package.json
├── vite.config.js
├── index.html
├── .gitignore
├── src/App.jsx
├── src/main.jsx
└── contracts/VidnovaEscrow.sol
```

### 2. Встанови залежності

```bash
npm install
```

Це поставить React, Vite, lucide-react, gh-pages.

### 3. Перевір локально

```bash
npm run dev
```

Відкрий http://localhost:5173 — має все працювати точно так само як в артефакті.

Якщо щось ламається — кидай помилку, поправлю.

### 4. Створи репозиторій на GitHub

1. Зайди на https://github.com/new
2. Repository name: **vidnova**
3. Public
4. **НЕ** додавай README, .gitignore, license (вони вже є локально)
5. Create repository

### 5. Запуш код на GitHub

```bash
git init
git add .
git commit -m "initial vidnova prototype"
git branch -M main
git remote add origin https://github.com/jaqandgus/vidnova.git
git push -u origin main
```

### 6. Зроби деплой на GitHub Pages

```bash
npm run deploy
```

Ця команда:
1. Збилдить проєкт у папку `dist/`
2. Запушить вміст `dist/` у гілку `gh-pages` твого репозиторію

### 7. Активуй GitHub Pages

1. Йди в Settings репозиторію → Pages
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **(root)**
4. Save

Через 1-2 хвилини сайт буде доступний за адресою:

**https://jaqandgus.github.io/vidnova**

### 8. Перевір

Відкрий лінк у браузері. Якщо все працює — готово, можна вставляти лінк у заявку.

Якщо сайт відкривається пустий або з помилками 404 — найчастіша причина в неправильному `base` в `vite.config.js`. Має бути `base: '/vidnova/'` (з обома слешами).

---

## Якщо щось пішло не так

**Білий екран, помилки в консолі браузера**
→ Відкрий DevTools (F12), скопіюй помилку, надішли мені.

**404 при відкритті https://jaqandgus.github.io/vidnova**
→ Перевір чи активована Pages в Settings, чи є гілка gh-pages в репозиторії.

**`npm run dev` падає локально**
→ Перевір версію Node: `node -v` має бути 18+. Якщо 16 чи нижче — треба оновити.

**`git push` запитує логін/пароль**
→ Ти або не залогінений в git, або не налаштований SSH. Найпростіше — використати GitHub CLI (`gh auth login`) або Personal Access Token замість пароля.

---

## Подальші правки

Будь-які зміни в коді після першого деплою:

```bash
# зробив зміни в src/App.jsx
git add .
git commit -m "опис зміни"
git push
npm run deploy
```

Кожен `npm run deploy` оновлює сайт за хвилину-дві.
