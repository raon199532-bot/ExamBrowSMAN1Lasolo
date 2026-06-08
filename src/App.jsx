import { useState, useEffect } from 'react';
import StudentApp from './components/StudentApp';
import TeacherDashboard from './components/TeacherDashboard';

// Mock Initial logs to make the simulator dashboard look alive immediately
const INITIAL_LOGS = [
  {
    id: 'log-1',
    studentName: 'Fatimah Azzahra',
    timestamp: '15:42:10',
    severity: 'warning',
    message: 'Mencoba klik kanan (Context Menu diblokir)'
  },
  {
    id: 'log-2',
    studentName: 'Fatimah Azzahra',
    timestamp: '15:43:05',
    severity: 'critical',
    message: 'Mencoba shortcut Copy/Paste (Layar dikunci otomatis)'
  },
  {
    id: 'log-3',
    studentName: 'Rian Hidayat',
    timestamp: '15:48:22',
    severity: 'warning',
    message: 'Mencoba membagi layar (Split Screen terdeteksi)'
  }
];

// Mock Initial student sessions
const INITIAL_SESSIONS = [
  {
    id: 'budi-setiawan',
    name: 'Budi Setiawan',
    className: 'XII MIPA 1',
    status: 'Completed',
    violationsCount: 0,
    lastActiveTime: '15:35:12',
    blockReason: ''
  },
  {
    id: 'fatimah-azzahra',
    name: 'Fatimah Azzahra',
    className: 'XII MIPA 2',
    status: 'Blocked',
    violationsCount: 2,
    lastActiveTime: '15:43:05',
    blockReason: 'Mencoba Copy/Paste (Layar dikunci)'
  },
  {
    id: 'rian-hidayat',
    name: 'Rian Hidayat',
    className: 'XII IPS 1',
    status: 'Active',
    violationsCount: 1,
    lastActiveTime: '15:48:22',
    blockReason: 'Deteksi Split Screen'
  }
];

export default function App() {
  // Read role from URL query param
  const [role, setRole] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('role'); // 'siswa' | 'guru' | null
  });

  // Config state
  const [examUrl, setExamUrl] = useState(() => {
    return localStorage.getItem('exambrow_examUrl') || 'https://docs.google.com/forms/d/e/1FAIpQLSfMockExam123/viewform';
  });
  const [examToken, setExamToken] = useState(() => {
    return localStorage.getItem('exambrow_examToken') || 'EXAM2026';
  });
  const [masterPin, setMasterPin] = useState(() => {
    return localStorage.getItem('exambrow_masterPin') || '1234';
  });

  // Logs and Sessions states
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('exambrow_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('exambrow_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  // Toast system state
  const [toast, setToast] = useState({ show: false, type: 'success', text: '' });

  // Function to show custom alert toasts
  const triggerToast = (type, text) => {
    setToast({ show: true, type, text });
  };

  // Sync changes to localStorage
  useEffect(() => {
    localStorage.setItem('exambrow_examUrl', examUrl);
  }, [examUrl]);

  useEffect(() => {
    localStorage.setItem('exambrow_examToken', examToken);
  }, [examToken]);

  useEffect(() => {
    localStorage.setItem('exambrow_masterPin', masterPin);
  }, [masterPin]);

  useEffect(() => {
    localStorage.setItem('exambrow_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('exambrow_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Listen for storage events from other tabs to sync states in real time
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.newValue === null) return;
      try {
        if (e.key === 'exambrow_examUrl') {
          setExamUrl(e.newValue);
        } else if (e.key === 'exambrow_examToken') {
          setExamToken(e.newValue);
        } else if (e.key === 'exambrow_masterPin') {
          setMasterPin(e.newValue);
        } else if (e.key === 'exambrow_logs') {
          setLogs(JSON.parse(e.newValue));
        } else if (e.key === 'exambrow_sessions') {
          setSessions(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.error('Failed to parse synchronized storage state:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.show]);

  // Helper to add violation logs from student app to portal
  const addViolationLog = (studentName, severity, message) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newLog = {
      id: `log-${Date.now()}`,
      studentName,
      timestamp: timeStr,
      severity, // info | warning | critical
      message
    };
    setLogs(prev => {
      const updated = [...prev, newLog];
      localStorage.setItem('exambrow_logs', JSON.stringify(updated));
      return updated;
    });
  };

  const clearLogs = () => {
    setLogs([]);
    localStorage.setItem('exambrow_logs', JSON.stringify([]));
    triggerToast('success', 'Log aktivitas berhasil dibersihkan.');
  };

  const handleExitRole = () => {
    // Navigate back to menu
    window.location.search = '';
  };

  return (
    <div className={`app-container role-${role || 'none'}`}>
      
      {/* Dynamic Toast system */}
      {toast.show && (
        <div className="btn-toast">
          <span className={`toast-icon ${toast.type}`}>
            {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : '⚠️'}
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--text-primary))' }}>
            {toast.text}
          </span>
        </div>
      )}

      {/* Main Branding Header */}
      <header className="app-header">
        <div className="logo-section" style={{ cursor: role ? 'pointer' : 'default' }} onClick={role ? handleExitRole : undefined}>
          <div className="logo-badge">🛡️</div>
          <div className="logo-text">
            <h1>EXAMBROW GUARD</h1>
            <span>{role ? `Mode ${role === 'siswa' ? 'Siswa (Client)' : role === 'guru' ? 'Guru (Portal)' : 'Demo (Berdampingan)'}` : 'Simulasi Proteksi Kiosk & Portal Monitoring'}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {role && role !== 'siswa' && (
            <button className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer' }} onClick={handleExitRole}>
              ◀ Menu Utama
            </button>
          )}
          <div className="header-status">
            <span className="status-dot"></span>
            <span>{role ? `Tab Terhubung (${role.toUpperCase()})` : 'Dual Simulator Synchronized'}</span>
          </div>
        </div>
      </header>

      {/* Landing page when no role is chosen */}
      {!role ? (
        <div className="landing-container">
          <div className="landing-card">
            <h2 className="landing-title">Exambrow Guard Simulator</h2>
            <p className="landing-subtitle">
              Sistem perlindungan ujian Kiosk terintegrasi dengan Portal Pengawas. Silakan pilih peranan Anda untuk membuka aplikasi:
            </p>
            
            <div className="landing-grid">
              
              <div className="landing-option-card student" onClick={() => window.open('?role=siswa', '_blank')}>
                <div className="option-icon">📱</div>
                <h3>Sisi Siswa (Client App)</h3>
                <p>Simulasi webview ujian aman pada handphone siswa yang mendeteksi split screen, screenshot, dan app switching.</p>
                <span className="option-link-btn">Buka Layar Siswa (Tab Baru) &rarr;</span>
              </div>

              <div className="landing-option-card teacher" onClick={() => window.open('?role=guru', '_blank')}>
                <div className="option-icon">💻</div>
                <h3>Sisi Guru (Web Portal)</h3>
                <p>Dashboard pengawasan ujian real-time untuk memantau status siswa, melihat riwayat kecurangan, dan membuka/mengunci layar secara remote.</p>
                <span className="option-link-btn">Buka Portal Guru (Tab Baru) &rarr;</span>
              </div>

            </div>

            <div className="landing-divider">
              <span>atau</span>
            </div>

            <button className="btn-demo-mode" onClick={() => setRole('demo')}>
              🖥️ Uji Coba Berdampingan (Mode Demo 1 Layar)
            </button>
          </div>
        </div>
      ) : (
        /* Workspace Sandbox Split */
        <main className={`workspace-layout ${role !== 'demo' ? 'single-layout' : ''}`}>
          
          {/* Left column: Student Mobile App client */}
          {(role === 'demo' || role === 'siswa') && (
            <div className={`student-wrapper ${role === 'siswa' ? 'centered-view' : ''}`}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'hsl(var(--text-secondary))', alignSelf: role === 'siswa' ? 'center' : 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📱 Sisi Siswa <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>(Mobile Screen Simulator)</span>
              </h2>
              
              <StudentApp
                examUrl={examUrl}
                examToken={examToken}
                masterPin={masterPin}
                addViolationLog={addViolationLog}
                sessions={sessions}
                setSessions={setSessions}
                showToast={triggerToast}
              />
            </div>
          )}

          {/* Right column: Teacher Portal Admin Web Dashboard */}
          {(role === 'demo' || role === 'guru') && (
            <div className={`teacher-wrapper ${role === 'guru' ? 'expanded-view' : ''}`}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.20rem', color: 'hsl(var(--text-secondary))', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                💻 Sisi Guru & Pengawas <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>(Web Dashboard Portal)</span>
              </h2>
              
              <TeacherDashboard
                examUrl={examUrl}
                setExamUrl={setExamUrl}
                examToken={examToken}
                setExamToken={setExamToken}
                masterPin={masterPin}
                setMasterPin={setMasterPin}
                logs={logs}
                clearLogs={clearLogs}
                sessions={sessions}
                setSessions={setSessions}
                showToast={triggerToast}
              />
            </div>
          )}

        </main>
      )}
    </div>
  );
}
