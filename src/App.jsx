import React, { useState } from 'react';
import { ArrowRight, Wallet, ExternalLink, CheckCircle2, Clock, Users, TrendingUp, Shield, X, FileCheck, Building2, Coins, BarChart3 } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Відновлення школи №17',
    location: 'Ізюм, Харківська область',
    organizer: 'БФ "Сходинки до миру"',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    target: 48000,
    raised: 31200,
    donors: 247,
    status: 'active',
    category: 'Освіта',
    description: 'Капітальний ремонт даху та системи опалення школи, пошкодженої внаслідок обстрілів. Освіта для 340 учнів.',
    stages: [
      { name: 'Демонтаж пошкоджень', budget: 8000, status: 'completed', txHash: '0x4f8a...c2b1' },
      { name: 'Покрівельні роботи', budget: 18000, status: 'in_progress', txHash: '0x7d2e...9a4f' },
      { name: 'Система опалення', budget: 14000, status: 'pending', txHash: null },
      { name: 'Внутрішнє оздоблення', budget: 8000, status: 'pending', txHash: null },
    ],
    recentDonors: [
      { wallet: '0x4f8a...8a2c', amount: 500, time: '2 год тому' },
      { wallet: '0x9c1d...f4e2', amount: 1200, time: '5 год тому' },
      { wallet: '0x2a7b...3c91', amount: 100, time: '8 год тому' },
      { wallet: '0xe5d8...7b2a', amount: 250, time: '1 день тому' },
    ],
  },
  {
    id: 2,
    title: 'Реабілітаційний центр',
    location: 'Харків',
    organizer: 'ГО "Незламні"',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    target: 75000,
    raised: 52400,
    donors: 412,
    status: 'active',
    category: 'Медицина',
    description: 'Облаштування центру фізичної та психологічної реабілітації для ветеранів та постраждалих цивільних.',
    stages: [
      { name: 'Ремонт приміщення', budget: 22000, status: 'completed', txHash: '0x1a3b...8e7d' },
      { name: 'Медичне обладнання', budget: 35000, status: 'in_progress', txHash: '0xc4f2...1d9a' },
      { name: 'Підбір персоналу', budget: 18000, status: 'pending', txHash: null },
    ],
    recentDonors: [
      { wallet: '0x8b3f...d2c4', amount: 2000, time: '30 хв тому' },
      { wallet: '0x6e1a...9c3b', amount: 750, time: '3 год тому' },
      { wallet: '0xa4d7...2f8e', amount: 300, time: '6 год тому' },
    ],
  },
  {
    id: 3,
    title: 'Енергоавтономність ОТГ',
    location: 'Балаклія, Харківська область',
    organizer: 'Балаклійська ОТГ',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    target: 120000,
    raised: 28500,
    donors: 156,
    status: 'active',
    category: 'Інфраструктура',
    description: 'Сонячні панелі та акумулятори для критичних об\'єктів: лікарні, водоканалу та шкіл громади.',
    stages: [
      { name: 'Аудит та проектування', budget: 12000, status: 'completed', txHash: '0x9f4a...3b1c' },
      { name: 'Закупівля обладнання', budget: 75000, status: 'in_progress', txHash: '0x2c8d...e5f7' },
      { name: 'Монтаж', budget: 25000, status: 'pending', txHash: null },
      { name: 'Запуск та тестування', budget: 8000, status: 'pending', txHash: null },
    ],
    recentDonors: [
      { wallet: '0xf2e9...a8b3', amount: 5000, time: '1 год тому' },
      { wallet: '0x3d4c...7e1f', amount: 800, time: '4 год тому' },
    ],
  },
  {
    id: 4,
    title: 'Дитячий садок №4',
    location: 'Чугуїв, Харківська область',
    organizer: 'БФ "Майбутнє дітям"',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
    target: 32000,
    raised: 32000,
    donors: 318,
    status: 'completed',
    category: 'Освіта',
    description: 'Відновлення дитячого садка, пошкодженого вибуховою хвилею. Облаштування укриття.',
    stages: [
      { name: 'Демонтаж та укріплення', budget: 9000, status: 'completed', txHash: '0x5b7e...c2d8' },
      { name: 'Облаштування укриття', budget: 14000, status: 'completed', txHash: '0x8a3f...4e91' },
      { name: 'Внутрішні роботи', budget: 9000, status: 'completed', txHash: '0xd1c6...7b2a' },
    ],
    recentDonors: [
      { wallet: '0x1e4a...5d9c', amount: 1500, time: '2 дні тому' },
      { wallet: '0x7f2b...8c3e', amount: 400, time: '3 дні тому' },
    ],
  },
];

const stats = {
  totalRaised: 144100,
  activeProjects: 3,
  completedProjects: 1,
  totalDonors: 1133,
  verifiedNgos: 8,
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [donateModal, setDonateModal] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [donateAmount, setDonateAmount] = useState('100');
  const [view, setView] = useState('home');

  const formatUSD = (n) => `$${n.toLocaleString('en-US')}`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: '#e8e8ed', fontFamily: '"Geist", "Inter", system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&display=swap');

        * { box-sizing: border-box; }
        body { margin: 0; }
        .mono { font-family: "Geist Mono", ui-monospace, monospace; }
        .display { font-family: "Fraunces", serif; font-feature-settings: "ss01"; letter-spacing: -0.02em; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .glow {
          background: radial-gradient(circle at 50% 0%, rgba(220, 240, 100, 0.08) 0%, transparent 60%);
        }

        .card {
          background: linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          transition: border-color 0.2s, transform 0.2s;
        }
        .card:hover {
          border-color: rgba(220, 240, 100, 0.3);
          transform: translateY(-2px);
        }

        .btn-primary {
          background: #dcf064;
          color: #0a0a0f;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          background: #e6f47a;
          box-shadow: 0 0 24px rgba(220, 240, 100, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: #e8e8ed;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.03);
        }

        .progress-bar {
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
          overflow: hidden;
          height: 6px;
        }
        .progress-fill {
          background: linear-gradient(90deg, #dcf064 0%, #b8d040 100%);
          height: 100%;
          border-radius: 999px;
          transition: width 0.6s ease;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .badge-active { background: rgba(220, 240, 100, 0.12); color: #dcf064; border: 1px solid rgba(220, 240, 100, 0.25); }
        .badge-completed { background: rgba(120, 200, 120, 0.12); color: #78c878; border: 1px solid rgba(120, 200, 120, 0.25); }
        .badge-pending { background: rgba(255,255,255,0.05); color: #888; border: 1px solid rgba(255,255,255,0.1); }
        .badge-progress { background: rgba(100, 180, 240, 0.12); color: #64b4f0; border: 1px solid rgba(100, 180, 240, 0.25); }

        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          z-index: 100; padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .modal-content {
          animation: slideUp 0.3s ease;
        }

        .nav-link {
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: color 0.2s;
          font-size: 14px;
        }
        .nav-link:hover, .nav-link.active { color: #e8e8ed; }

        .stat-card {
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
        }
      `}</style>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, backgroundColor: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => { setView('home'); setSelectedProject(null); }} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#dcf064', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0f', fontWeight: 700, fontSize: 16 }}>V</div>
            <span className="display" style={{ fontSize: 22, fontWeight: 500 }}>Vidnova</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <span className={`nav-link ${view === 'home' ? 'active' : ''}`} onClick={() => { setView('home'); setSelectedProject(null); }}>Проєкти</span>
            <span className={`nav-link ${view === 'dashboard' ? 'active' : ''}`} onClick={() => { setView('dashboard'); setSelectedProject(null); }}>Прозорість</span>
            <span className={`nav-link ${view === 'ngo' ? 'active' : ''}`} onClick={() => { setView('ngo'); setSelectedProject(null); }}>Для НГО</span>
            <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => setWalletModal(true)}>
              <Wallet size={14} /> Підключити
            </button>
          </div>
        </div>
      </nav>

      {/* HERO + PROJECTS */}
      {view === 'home' && !selectedProject && (
        <>
          <section className="grid-bg glow" style={{ padding: '80px 32px 60px', position: 'relative' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <div style={{ maxWidth: 720 }}>
                <div className="mono" style={{ fontSize: 12, color: '#dcf064', letterSpacing: '0.15em', marginBottom: 20, textTransform: 'uppercase' }}>
                  ▸ On-chain transparency · BNB Chain
                </div>
                <h1 className="display" style={{ fontSize: 64, lineHeight: 1.05, fontWeight: 400, margin: '0 0 24px' }}>
                  Кожна гривня<br />на відновлення —<br /><em style={{ color: '#dcf064', fontStyle: 'italic' }}>видима</em>.
                </h1>
                <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', margin: '0 0 36px', maxWidth: 580 }}>
                  Платформа для НГО, благодійних фондів та громад України. Збір донатів у стейблкоїнах із верифікацією отримувачів та публічною звітністю на блокчейні.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn-primary" style={{ padding: '14px 24px', borderRadius: 10, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => document.getElementById('projects-list')?.scrollIntoView({ behavior: 'smooth' })}>
                    Переглянути проєкти <ArrowRight size={16} />
                  </button>
                  <button className="btn-secondary" style={{ padding: '14px 24px', borderRadius: 10, fontSize: 15 }} onClick={() => { setView('ngo'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Для організацій
                  </button>
                </div>
              </div>

              {/* STATS STRIP */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 80 }}>
                {[
                  { label: 'Залучено', value: formatUSD(stats.totalRaised), sub: 'USDT через смартконтракти' },
                  { label: 'Активних проєктів', value: stats.activeProjects, sub: `+${stats.completedProjects} завершено` },
                  { label: 'Донорів', value: stats.totalDonors.toLocaleString(), sub: 'унікальних гаманців' },
                  { label: 'Верифікованих НГО', value: stats.verifiedNgos, sub: 'on-chain атестація' },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
                    <div className="display" style={{ fontSize: 32, fontWeight: 500, marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PROJECTS LIST */}
          <section id="projects-list" style={{ padding: '60px 32px 100px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
                <h2 className="display" style={{ fontSize: 36, fontWeight: 400, margin: 0 }}>Активні проєкти</h2>
                <span className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  {projects.length} проєктів · оновлено щохвилини
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                {projects.map((p) => {
                  const pct = Math.round((p.raised / p.target) * 100);
                  return (
                    <div key={p.id} className="card" style={{ borderRadius: 14, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedProject(p)}>
                      <div style={{ height: 180, background: `linear-gradient(180deg, transparent 40%, rgba(10,10,15,0.95) 100%), url(${p.image}) center/cover`, position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 6 }}>
                          <span className={`badge ${p.status === 'active' ? 'badge-active' : 'badge-completed'}`}>
                            {p.status === 'active' ? '● Активний' : '✓ Завершено'}
                          </span>
                          <span className="badge badge-pending">{p.category}</span>
                        </div>
                      </div>
                      <div style={{ padding: 22 }}>
                        <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: '0 0 4px' }}>{p.title}</h3>
                        <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>{p.location} · {p.organizer}</div>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, margin: '0 0 18px' }}>{p.description}</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                          <span style={{ color: '#dcf064', fontWeight: 500 }}>{formatUSD(p.raised)}</span>
                          <span style={{ color: 'rgba(255,255,255,0.5)' }}>з {formatUSD(p.target)}</span>
                        </div>
                        <div className="progress-bar" style={{ marginBottom: 14 }}>
                          <div className="progress-fill" style={{ width: `${pct}%` }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                          <span><Users size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />{p.donors} донорів</span>
                          <span style={{ color: '#dcf064' }}>Деталі →</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* PROJECT DETAIL */}
      {selectedProject && (
        <section style={{ padding: '40px 32px 100px', maxWidth: 1280, margin: '0 auto' }}>
          <button className="btn-secondary" style={{ padding: '8px 14px', borderRadius: 8, fontSize: 13, marginBottom: 24 }} onClick={() => setSelectedProject(null)}>
            ← Назад до проєктів
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
            <div>
              <div style={{ height: 320, background: `linear-gradient(180deg, transparent 50%, rgba(10,10,15,0.7) 100%), url(${selectedProject.image}) center/cover`, borderRadius: 14, marginBottom: 28, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                    <span className={`badge ${selectedProject.status === 'active' ? 'badge-active' : 'badge-completed'}`}>
                      {selectedProject.status === 'active' ? '● Активний' : '✓ Завершено'}
                    </span>
                    <span className="badge badge-pending">{selectedProject.category}</span>
                  </div>
                  <h1 className="display" style={{ fontSize: 42, fontWeight: 500, margin: '0 0 6px', lineHeight: 1.1 }}>{selectedProject.title}</h1>
                  <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{selectedProject.location} · {selectedProject.organizer}</div>
                </div>
              </div>

              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', marginBottom: 36 }}>{selectedProject.description}</p>

              <h3 className="display" style={{ fontSize: 24, fontWeight: 500, margin: '0 0 18px' }}>Етапи виконання</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedProject.stages.map((s, i) => (
                  <div key={i} className="card" style={{ borderRadius: 10, padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: s.status === 'completed' ? 'rgba(120,200,120,0.15)' : s.status === 'in_progress' ? 'rgba(100,180,240,0.15)' : 'rgba(255,255,255,0.05)' }}>
                        {s.status === 'completed' ? <CheckCircle2 size={16} color="#78c878" /> : s.status === 'in_progress' ? <Clock size={16} color="#64b4f0" /> : <div style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.2)' }} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{s.name}</div>
                        <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                          {s.status === 'completed' ? 'Завершено' : s.status === 'in_progress' ? 'Виконується' : 'Очікує'}
                          {s.txHash && <span style={{ marginLeft: 8 }}>· tx {s.txHash} <ExternalLink size={10} style={{ display: 'inline', verticalAlign: -1 }} /></span>}
                        </div>
                      </div>
                    </div>
                    <div className="mono" style={{ fontSize: 14, color: '#dcf064', fontWeight: 500 }}>{formatUSD(s.budget)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card" style={{ borderRadius: 14, padding: 24, marginBottom: 16, position: 'sticky', top: 88 }}>
                <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Зібрано</div>
                <div className="display" style={{ fontSize: 38, fontWeight: 500, marginBottom: 4, color: '#dcf064' }}>{formatUSD(selectedProject.raised)}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 18 }}>з цілі {formatUSD(selectedProject.target)} · {Math.round((selectedProject.raised / selectedProject.target) * 100)}%</div>
                <div className="progress-bar" style={{ marginBottom: 24, height: 8 }}>
                  <div className="progress-fill" style={{ width: `${(selectedProject.raised / selectedProject.target) * 100}%` }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>Донорів</div>
                    <div style={{ fontSize: 20, fontWeight: 500 }}>{selectedProject.donors}</div>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>Етапів</div>
                    <div style={{ fontSize: 20, fontWeight: 500 }}>{selectedProject.stages.filter(s => s.status === 'completed').length}/{selectedProject.stages.length}</div>
                  </div>
                </div>

                {selectedProject.status === 'active' && (
                  <button className="btn-primary" style={{ width: '100%', padding: '14px', borderRadius: 10, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={() => setDonateModal(true)}>
                    <Wallet size={16} /> Задонатити USDT
                  </button>
                )}
                {selectedProject.status === 'completed' && (
                  <div style={{ padding: 14, borderRadius: 10, background: 'rgba(120,200,120,0.08)', border: '1px solid rgba(120,200,120,0.2)', textAlign: 'center', fontSize: 13, color: '#78c878' }}>
                    ✓ Збір завершено
                  </div>
                )}

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 22, paddingTop: 18 }}>
                  <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Останні донати</div>
                  {selectedProject.recentDonors.map((d, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < selectedProject.recentDonors.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div>
                        <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{d.wallet}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{d.time}</div>
                      </div>
                      <div className="mono" style={{ fontSize: 13, color: '#dcf064', fontWeight: 500 }}>${d.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DASHBOARD */}
      {view === 'dashboard' && !selectedProject && (
        <section style={{ padding: '60px 32px 100px', maxWidth: 1280, margin: '0 auto' }}>
          <div className="mono" style={{ fontSize: 12, color: '#dcf064', letterSpacing: '0.15em', marginBottom: 16, textTransform: 'uppercase' }}>▸ Public ledger</div>
          <h1 className="display" style={{ fontSize: 48, fontWeight: 400, margin: '0 0 16px' }}>Прозорість</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 600, marginBottom: 48 }}>
            Усі транзакції зафіксовані on-chain. Кожна сума, що надходить на платформу, потрапляє в смартконтракт ескроу та розблоковується лише після підтвердження виконання етапу.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
            {[
              { icon: TrendingUp, label: 'Total Volume', value: formatUSD(stats.totalRaised), sub: 'за весь період' },
              { icon: Users, label: 'Унікальних донорів', value: stats.totalDonors.toLocaleString(), sub: 'wallet addresses' },
              { icon: Shield, label: 'Верифікованих НГО', value: stats.verifiedNgos, sub: 'через DID-атестацію' },
              { icon: CheckCircle2, label: 'Завершених етапів', value: '7', sub: 'із 14 загалом' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="stat-card">
                  <Icon size={20} color="#dcf064" style={{ marginBottom: 12 }} />
                  <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
                  <div className="display" style={{ fontSize: 30, fontWeight: 500, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{s.sub}</div>
                </div>
              );
            })}
          </div>

          <div className="card" style={{ borderRadius: 14, padding: 28 }}>
            <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: '0 0 20px' }}>Останні транзакції</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { hash: '0x4f8a8c2b1d9e7a3f...c2b1', from: '0x4f8a...8a2c', project: 'Школа №17, Ізюм', amount: 500, time: '2 год тому', type: 'donation' },
                { hash: '0x7d2e9a4f1c8b3e6d...9a4f', from: 'escrow', project: 'Школа №17, Ізюм', amount: 18000, time: '4 год тому', type: 'release' },
                { hash: '0x9c1df4e2a8b3c6d1...f4e2', from: '0x9c1d...f4e2', project: 'Реабцентр, Харків', amount: 1200, time: '5 год тому', type: 'donation' },
                { hash: '0x2a7b3c91e5d87b2a...3c91', from: '0x2a7b...3c91', project: 'Школа №17, Ізюм', amount: 100, time: '8 год тому', type: 'donation' },
                { hash: '0xf2e9a8b33d4c7e1f...a8b3', from: '0xf2e9...a8b3', project: 'ОТГ Балаклія', amount: 5000, time: '1 год тому', type: 'donation' },
                { hash: '0x1a3b8e7dc4f21d9a...8e7d', from: 'escrow', project: 'Реабцентр, Харків', amount: 22000, time: '12 год тому', type: 'release' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                  <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                    {t.hash} <ExternalLink size={11} style={{ display: 'inline', verticalAlign: -1, color: 'rgba(255,255,255,0.4)' }} />
                  </div>
                  <span className={`badge ${t.type === 'donation' ? 'badge-progress' : 'badge-active'}`} style={{ width: 'fit-content' }}>
                    {t.type === 'donation' ? '↓ Донат' : '↑ Виплата етапу'}
                  </span>
                  <div style={{ fontSize: 13 }}>{t.project}</div>
                  <div className="mono" style={{ fontSize: 13, color: '#dcf064', fontWeight: 500 }}>${t.amount.toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'right' }}>{t.time}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NGO PAGE */}
      {view === 'ngo' && !selectedProject && (
        <section style={{ padding: '60px 32px 100px', maxWidth: 1280, margin: '0 auto' }}>
          <div className="mono" style={{ fontSize: 12, color: '#dcf064', letterSpacing: '0.15em', marginBottom: 16, textTransform: 'uppercase' }}>▸ For organizations</div>
          <h1 className="display" style={{ fontSize: 48, fontWeight: 400, margin: '0 0 16px', maxWidth: 800, lineHeight: 1.05 }}>Залучайте міжнародні донати без посередників</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 720, lineHeight: 1.6, marginBottom: 56 }}>
            Vidnova — інструмент для верифікованих НГО, благодійних фондів та громад України. Публікуйте конкретні проєкти відновлення, отримуйте донати у стейблкоїнах напряму, демонструйте прогрес on-chain.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 56 }}>
            {[
              { icon: FileCheck, title: '01 · Верифікація', text: 'Подаєте реєстраційні документи організації. Платформа перевіряє статус і публічну історію. Атестація фіксується on-chain (DID).' },
              { icon: Building2, title: '02 · Публікація проєкту', text: 'Створюєте проєкт відновлення з описом, бюджетом по етапах, фотографіями. Кожен етап — окрема контрольна точка для коштів.' },
              { icon: Coins, title: '03 · Збір коштів', text: 'Донори надсилають USDT через смартконтракт ескроу. Кошти заморожуються до підтвердження виконання етапу.' },
              { icon: BarChart3, title: '04 · Звітність', text: 'Завантажуєте підтвердження виконання (фото, акти, документи). Після верифікації кошти етапу автоматично розблоковуються.' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="card" style={{ borderRadius: 12, padding: 22 }}>
                  <Icon size={22} color="#dcf064" style={{ marginBottom: 14 }} />
                  <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', marginBottom: 8, textTransform: 'uppercase' }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 }}>{s.text}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
            <div className="card" style={{ borderRadius: 14, padding: 28 }}>
              <h3 className="display" style={{ fontSize: 24, fontWeight: 500, margin: '0 0 18px' }}>Що отримуєте</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Прямий доступ до міжнародних донорів через стейблкоїн-платежі',
                  'Інструмент звітності, що автоматично документує кожну транзакцію',
                  'Зростання довіри донорів за рахунок прозорості on-chain',
                  'Інтеграція з існуючим робочим процесом — не вимагає Web3-експертизи від команди НГО',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="#dcf064" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ borderRadius: 14, padding: 28 }}>
              <h3 className="display" style={{ fontSize: 24, fontWeight: 500, margin: '0 0 18px' }}>Вимоги</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Зареєстрована в Україні НГО, благодійний фонд або ОТГ',
                  'Мінімум 12 місяців публічної діяльності з доступною звітністю',
                  'Конкретні об\'єкти відновлення з документально підтвердженою потребою',
                  'Готовність публікувати звіти про виконання етапів',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 18, height: 18, borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 5, height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.4)' }} />
                    </div>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card" style={{ borderRadius: 14, padding: 32, textAlign: 'center', background: 'linear-gradient(180deg, rgba(220,240,100,0.04) 0%, rgba(255,255,255,0.01) 100%)' }}>
            <div className="mono" style={{ fontSize: 11, color: '#dcf064', letterSpacing: '0.15em', marginBottom: 12, textTransform: 'uppercase' }}>▸ Closed beta · Q4 2026</div>
            <h3 className="display" style={{ fontSize: 28, fontWeight: 500, margin: '0 0 12px' }}>Партнерство з пілотними НГО</h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', maxWidth: 580, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Платформа в активній розробці. Шукаємо 3-5 пілотних організацій для першої публічної фази.
            </p>
            <button className="btn-secondary" style={{ padding: '12px 24px', borderRadius: 10, fontSize: 14 }} onClick={() => alert('Demo: тут відкриється форма для подачі заявки на пілотну участь')}>
              Подати заявку на участь
            </button>
          </div>
        </section>
      )}

      {/* DONATE MODAL */}
      {donateModal && selectedProject && (
        <div className="modal-overlay" onClick={() => setDonateModal(false)}>
          <div className="modal-content card" style={{ borderRadius: 16, padding: 32, maxWidth: 460, width: '100%', position: 'relative', background: '#13131a' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDonateModal(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            <div className="mono" style={{ fontSize: 11, color: '#dcf064', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>▸ Демо-режим</div>
            <h3 className="display" style={{ fontSize: 26, fontWeight: 500, margin: '0 0 6px' }}>Підтримати проєкт</h3>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 24 }}>{selectedProject.title}</div>

            <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Сума (USDT)</div>
            <input
              type="text"
              value={donateAmount}
              onChange={(e) => setDonateAmount(e.target.value.replace(/[^0-9]/g, ''))}
              style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: 22, fontFamily: '"Geist Mono", monospace', marginBottom: 12, outline: 'none' }}
            />

            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {[50, 100, 500, 1000].map(v => (
                <button key={v} onClick={() => setDonateAmount(v.toString())} className="btn-secondary" style={{ flex: 1, padding: '8px', borderRadius: 8, fontSize: 13 }}>${v}</button>
              ))}
            </div>

            <div style={{ background: 'rgba(220,240,100,0.06)', border: '1px solid rgba(220,240,100,0.2)', borderRadius: 10, padding: 14, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#dcf064', marginBottom: 4, fontWeight: 500 }}>Що отримаєте</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>Soulbound NFT-сертифікат участі у відновленні «{selectedProject.title}» з посиланням на on-chain підтвердження.</div>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '14px', borderRadius: 10, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={() => { alert('Demo: тут відкриється WalletConnect / MetaMask для підтвердження транзакції'); setDonateModal(false); }}>
              <Wallet size={16} /> Підключити гаманець
            </button>
            <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 12, letterSpacing: '0.05em' }}>BNB Chain · USDT · Gas ≈ $0.12</div>
          </div>
        </div>
      )}

      {/* WALLET CONNECT MODAL */}
      {walletModal && (
        <div className="modal-overlay" onClick={() => setWalletModal(false)}>
          <div className="modal-content card" style={{ borderRadius: 16, padding: 32, maxWidth: 420, width: '100%', position: 'relative', background: '#13131a' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setWalletModal(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            <div className="mono" style={{ fontSize: 11, color: '#dcf064', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>▸ Демо-режим</div>
            <h3 className="display" style={{ fontSize: 24, fontWeight: 500, margin: '0 0 6px' }}>Підключити гаманець</h3>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 24 }}>Оберіть провайдер для підключення</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {[
                { name: 'MetaMask', desc: 'Найпопулярніший Web3-гаманець', color: '#f6851b', letter: 'M' },
                { name: 'WalletConnect', desc: 'Підключити мобільний гаманець', color: '#3b99fc', letter: 'W' },
                { name: 'Binance Wallet', desc: 'Нативний гаманець BNB Chain', color: '#f0b90b', letter: 'B' },
                { name: 'Coinbase Wallet', desc: 'Підключити через Coinbase', color: '#0052ff', letter: 'C' },
              ].map((w, i) => (
                <button
                  key={i}
                  onClick={() => alert(`Demo: тут відбудеться підключення через ${w.name}. Інтеграція буде реалізована у публічній бета-версії.`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 16px',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    color: '#fff',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(220, 240, 100, 0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: w.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 700, fontSize: 16, fontFamily: '"Geist Mono", monospace' }}>{w.letter}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{w.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{w.desc}</div>
                  </div>
                  <ArrowRight size={14} color="rgba(255,255,255,0.4)" />
                </button>
              ))}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 12 }}>
              <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'center', letterSpacing: '0.05em', lineHeight: 1.6 }}>
                Підключаючи гаманець, ви погоджуєтеся з умовами використання.<br />Vidnova не зберігає приватні ключі та не має доступу до коштів.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 32px', marginTop: 60 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: 5, background: '#dcf064', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0f', fontWeight: 700, fontSize: 13 }}>V</div>
            <span className="display" style={{ fontSize: 18, fontWeight: 500 }}>Vidnova</span>
            <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 8 }}>v0.1 · prototype</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            BNB Chain · USDT · IPFS · Built for Web3 Resilience Lab 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
