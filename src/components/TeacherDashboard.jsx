import React, { useState } from 'react';

// Icons
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const ShieldAlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3"/></svg>
);

export default function TeacherDashboard({
  examUrl,
  setExamUrl,
  examToken,
  setExamToken,
  masterPin,
  setMasterPin,
  logs,
  clearLogs,
  sessions,
  setSessions,
  showToast
}) {
  const [localUrl, setLocalUrl] = useState(examUrl);
  const [localToken, setLocalToken] = useState(examToken);
  const [localPin, setLocalPin] = useState(masterPin);
  const [showSettingsToast, setShowSettingsToast] = useState(false);

  // Stats calculation
  const totalStudents = sessions.length;
  const activeStudents = sessions.filter(s => s.status === 'Active').length;
  const blockedStudents = sessions.filter(s => s.status === 'Blocked').length;
  const completedStudents = sessions.filter(s => s.status === 'Completed').length;
  
  const complianceRate = totalStudents > 0 
    ? Math.round(((totalStudents - blockedStudents) / totalStudents) * 100) 
    : 100;

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (!localUrl.trim() || !localToken.trim() || !localPin.trim()) {
      showToast('error', 'Semua pengaturan harus diisi.');
      return;
    }
    setExamUrl(localUrl);
    setExamToken(localToken);
    setMasterPin(localPin);
    showToast('success', 'Konfigurasi ujian diperbarui.');
  };

  const handleRemoteLock = (sessionId, name) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, status: 'Blocked', blockReason: 'Kunci Paksa dari Dashboard Guru' };
      }
      return s;
    }));
    showToast('warn', `Mengunci layar ${name} secara remote.`);
  };

  const handleRemoteUnlock = (sessionId, name) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, status: 'Active', blockReason: '' };
      }
      return s;
    }));
    showToast('success', `Membuka kunci layar ${name} secara remote.`);
  };

  const handleLockAll = () => {
    if (sessions.length === 0) {
      showToast('error', 'Tidak ada siswa yang aktif saat ini.');
      return;
    }
    setSessions(prev => prev.map(s => {
      if (s.status === 'Active') {
        return { ...s, status: 'Blocked', blockReason: 'Kunci Massal dari Dashboard Guru' };
      }
      return s;
    }));
    showToast('error', 'Mengunci seluruh layar siswa yang sedang ujian!');
  };

  const handleUnlockAll = () => {
    if (sessions.length === 0) {
      showToast('error', 'Tidak ada siswa yang terdaftar saat ini.');
      return;
    }
    setSessions(prev => prev.map(s => {
      if (s.status === 'Blocked') {
        return { ...s, status: 'Active', blockReason: '' };
      }
      return s;
    }));
    showToast('success', 'Membuka seluruh layar siswa yang terkunci.');
  };

  return (
    <div className="teacher-section">
      
      {/* 1. Metrics Panel */}
      <div className="dashboard-card">
        <div className="dashboard-card-title">
          <h3>
            <UserIcon /> Ringkasan Aktivitas Ujian
          </h3>
          <span className="card-badge" style={{ backgroundColor: 'hsl(var(--primary)/0.15)', color: 'hsl(var(--primary))' }}>
            Live
          </span>
        </div>
        <div className="metrics-row">
          <div className="metric-box">
            <span className="metric-label">Tingkat Kepatuhan</span>
            <span className={`metric-value ${complianceRate < 70 ? 'text-danger' : complianceRate < 90 ? 'text-warning' : 'text-primary'}`}>
              {complianceRate}%
            </span>
            <span className="metric-subtitle">Bebas dari blokir kecurangan</span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Siswa Aktif</span>
            <span className="metric-value text-primary">{activeStudents}</span>
            <span className="metric-subtitle">Sedang mengerjakan soal</span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Siswa Terkunci</span>
            <span className="metric-value text-danger">{blockedStudents}</span>
            <span className="metric-subtitle">Memicu sistem keamanan</span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Total Selesai</span>
            <span className="metric-value text-info">{completedStudents} / {totalStudents}</span>
            <span className="metric-subtitle">Telah submit jawaban</span>
          </div>
        </div>
      </div>

      {/* 2. Live Logs Feed */}
      <div className="dashboard-card">
        <div className="dashboard-card-title">
          <h3>
            <ShieldAlertIcon /> Log Aktivitas Keamanan Siswa
          </h3>
          {logs.length > 0 && (
            <button className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }} onClick={clearLogs}>
              <TrashIcon /> Bersihkan Log
            </button>
          )}
        </div>
        <div className="logs-table-container">
          {logs.length === 0 ? (
            <div className="logs-empty">
              🟢 Belum ada pelanggaran terdeteksi. Semua siswa mematuhi protokol keamanan.
            </div>
          ) : (
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Waktu</th>
                  <th>Nama Siswa</th>
                  <th>Status</th>
                  <th>Rincian Pelanggaran</th>
                </tr>
              </thead>
              <tbody>
                {[...logs].reverse().map(log => (
                  <tr key={log.id}>
                    <td className="log-time">{log.timestamp}</td>
                    <td style={{ fontWeight: 600 }}>{log.studentName}</td>
                    <td>
                      <span className={`log-type-tag ${log.severity}`}>
                        {log.severity === 'critical' ? 'BLOCKED' : log.severity === 'warning' ? 'WARNING' : 'INFO'}
                      </span>
                    </td>
                    <td style={{ color: log.severity === 'critical' ? 'hsl(var(--danger))' : 'inherit' }}>
                      {log.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 3. Student Session Status List */}
      <div className="dashboard-card">
        <div className="dashboard-card-title">
          <h3>👥 Status Monitor Layar Siswa</h3>
          <span className="card-badge">Total: {totalStudents}</span>
        </div>
        
        {sessions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'hsl(var(--text-muted))', fontSize: '0.85rem' }}>
            Belum ada siswa yang bergabung ke dalam ujian. Mintalah siswa mengisi token di panel samping.
          </div>
        ) : (
          <div className="student-sessions-grid">
            {sessions.map(student => (
              <div 
                key={student.id} 
                className={`student-session-card status-${student.status.toLowerCase()}`}
              >
                <div className="student-session-header">
                  <span className="student-session-name" title={student.name}>{student.name}</span>
                  <span className={`student-status-badge ${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                </div>
                <span className="student-session-class">{student.className}</span>

                <div className="student-violations-count">
                  <span className="violations-dot"></span>
                  <span>Violations: <strong>{student.violationsCount}</strong></span>
                </div>

                <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }}>
                  {student.status === 'Blocked' ? (
                    <button 
                      className="btn-secondary" 
                      style={{ flex: 1, padding: '0.25rem', fontSize: '0.65rem', justifyContent: 'center' }}
                      onClick={() => handleRemoteUnlock(student.id, student.name)}
                    >
                      🔓 Unlock
                    </button>
                  ) : student.status === 'Active' ? (
                    <button 
                      className="btn-danger" 
                      style={{ flex: 1, padding: '0.25rem', fontSize: '0.65rem', justifyContent: 'center', backgroundColor: 'transparent' }}
                      onClick={() => handleRemoteLock(student.id, student.name)}
                    >
                      🔒 Lock
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Configuration Form */}
      <div className="dashboard-card">
        <div className="dashboard-card-title">
          <h3>
            <SettingsIcon /> Panel Konfigurasi Soal & PIN Keamanan
          </h3>
        </div>
        <form onSubmit={handleSaveSettings} className="settings-grid">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="settings-url">URL Web Ujian (Moodle/Google Forms)</label>
            <input
              id="settings-url"
              type="url"
              className="form-input"
              value={localUrl}
              onChange={(e) => setLocalUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="settings-token">Token Masuk Siswa</label>
            <input
              id="settings-token"
              type="text"
              className="form-input"
              style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
              value={localToken}
              onChange={(e) => setLocalToken(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="settings-pin">PIN Bypass Pengawas (Master PIN)</label>
            <input
              id="settings-pin"
              type="text"
              maxLength="6"
              className="form-input"
              style={{ fontFamily: 'var(--font-mono)' }}
              value={localPin}
              onChange={(e) => setLocalPin(e.target.value)}
              required
            />
          </div>

          <div className="settings-actions">
            <button type="submit" className="btn-primary" style={{ flex: 1, boxShadow: 'none' }}>
              Simpan Pengaturan
            </button>
            <button type="button" className="btn-danger" onClick={handleLockAll} title="Lock all active students">
              Kunci Semua HP
            </button>
            <button type="button" className="btn-secondary" onClick={handleUnlockAll} title="Unlock all blocked students">
              Unlock Semua HP
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
