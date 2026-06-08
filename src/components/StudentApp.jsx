import React, { useState, useEffect, useRef } from 'react';

// Common SVG Icons for UI
const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
);

const AlertIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);

const WifiIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3"/></svg>
);

const SignalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 20V4"/></svg>
);

const BatteryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="11" x2="23" y2="13"/></svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
);

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
);

const PencilsIcon = () => (
  <svg className="menu-pencils-svg" width="90" height="70" viewBox="0 0 100 80" fill="none">
    {/* Pink crayon */}
    <g transform="translate(15, 0) rotate(25)">
      <rect x="0" y="8" width="10" height="42" rx="1.5" fill="#ff7979" stroke="#ffffff" strokeWidth="2"/>
      <path d="M0 8 L5 0 L10 8 Z" fill="#fef08a" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M3 5 L5 0 L7 5 Z" fill="#ffffff"/>
      <rect x="0" y="44" width="10" height="6" fill="#facc15" stroke="#ffffff" strokeWidth="2"/>
      <line x1="0" y1="20" x2="10" y2="20" stroke="#ffffff" strokeWidth="1.5"/>
      <line x1="0" y1="32" x2="10" y2="32" stroke="#ffffff" strokeWidth="1.5"/>
    </g>
    {/* Blue crayon */}
    <g transform="translate(38, 5) rotate(25)">
      <rect x="0" y="8" width="10" height="42" rx="1.5" fill="#70a1ff" stroke="#ffffff" strokeWidth="2"/>
      <path d="M0 8 L5 0 L10 8 Z" fill="#fef08a" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M3 5 L5 0 L7 5 Z" fill="#ffffff"/>
      <rect x="0" y="44" width="10" height="6" fill="#facc15" stroke="#ffffff" strokeWidth="2"/>
      <line x1="0" y1="20" x2="10" y2="20" stroke="#ffffff" strokeWidth="1.5"/>
      <line x1="0" y1="32" x2="10" y2="32" stroke="#ffffff" strokeWidth="1.5"/>
    </g>
  </svg>
);

// Mock Questions for WebView Core Exam Simulation
const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "Tentukan turunan pertama dari fungsi f(x) = 3x^2 - 5x + 8.",
    options: [
      { key: "A", text: "f'(x) = 6x - 5" },
      { key: "B", text: "f'(x) = 6x + 8" },
      { key: "C", text: "f'(x) = 3x - 5" },
      { key: "D", text: "f'(x) = 6x^2 - 5x" }
    ]
  },
  {
    id: 2,
    question: "Sebuah dadu dilambungkan sekali. Peluang muncul mata dadu faktor dari 6 adalah...",
    options: [
      { key: "A", text: "1/6" },
      { key: "B", text: "2/3" },
      { key: "C", text: "1/2" },
      { key: "D", text: "5/6" }
    ]
  },
  {
    id: 3,
    question: "Manakah di bawah ini yang merupakan salah satu celah keamanan pada WebView yang digunakan siswa saat ujian?",
    options: [
      { key: "A", text: "Overlay Floating Window (Aplikasi melayang di atas WebView)" },
      { key: "B", text: "Menggunakan browser versi terbaru" },
      { key: "C", text: "Mengecilkan volume speaker perangkat HP" },
      { key: "D", text: "Mengaktifkan mode Pesawat (Airplane Mode)" }
    ]
  }
];

export default function StudentApp({
  examUrl,
  examToken,
  masterPin,
  addViolationLog,
  sessions,
  setSessions,
  showToast
}) {
  const [currentScreen, setCurrentScreen] = useState('password_lock'); // password_lock | main_menu | welcome | qr_scanner | webview | blocked | finished
  const [passwordInput, setPasswordInput] = useState('');
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [showBantuanModal, setShowBantuanModal] = useState(false);
  const [activeBannerSlide, setActiveBannerSlide] = useState(0);
  const [webviewMode, setWebviewMode] = useState('iframe'); // 'iframe' | 'simulated'
  const [selectedGFormAnswers, setSelectedGFormAnswers] = useState({});
  const [selectedMoodleAnswers, setSelectedMoodleAnswers] = useState({});

  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [enteredToken, setEnteredToken] = useState('');
  const [scannerSource, setScannerSource] = useState('main_menu');
  const [enteredUrl, setEnteredUrl] = useState(examUrl || '');
  const [scanText, setScanText] = useState('Arahkan kamera ke QR Code ujian...');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [toastHint, setToastHint] = useState({ show: false, text: '' });
  const [blackoutActive, setBlackoutActive] = useState(false);
  const [unlockPin, setUnlockPin] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [currentTimeStr, setCurrentTimeStr] = useState('08:00');
  
  const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // 'environment' (back) | 'user' (front)
  const webviewBodyRef = useRef(null);
  const sessionRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Request HTML5 Fullscreen mode helper
  const enterFullscreen = () => {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch((err) => console.warn('Browser blocked fullscreen request:', err));
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen();
    } else if (docEl.mozRequestFullScreen) {
      docEl.mozRequestFullScreen();
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen();
    }
  };

  // Exit HTML5 Fullscreen helper
  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => console.warn('Failed to exit fullscreen:', err));
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Sync entered URL with main state if unchanged by user
  useEffect(() => {
    if (examUrl && currentScreen === 'welcome') {
      setEnteredUrl(examUrl);
    }
  }, [examUrl, currentScreen]);

  // Update clock on simulated phone status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll banner slides
  useEffect(() => {
    if (currentScreen !== 'main_menu') return;
    const bannerTimer = setInterval(() => {
      setActiveBannerSlide(prev => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(bannerTimer);
  }, [currentScreen]);

  // Timer Countdown during exam WebView
  useEffect(() => {
    if (currentScreen !== 'webview') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCurrentScreen('finished');
          updateSessionStatus('Completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentScreen]);

  // Register or update student session
  const updateSessionStatus = (status, blockReason = '') => {
    if (!studentName) return;
    const sessionId = studentName.toLowerCase().replace(/\s+/g, '-');
    setSessions(prev => {
      const idx = prev.findIndex(s => s.id === sessionId);
      const now = new Date().toLocaleTimeString();
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          status,
          lastActiveTime: now,
          blockReason: blockReason || updated[idx].blockReason
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: sessionId,
            name: studentName,
            className: studentClass || 'XII MIPA 1',
            status,
            violationsCount: 0,
            lastActiveTime: now,
            blockReason
          }
        ];
      }
    });
  };

  // Increment Violation Count on session state
  const incrementSessionViolation = (breachType) => {
    if (!studentName) return;
    const sessionId = studentName.toLowerCase().replace(/\s+/g, '-');
    setSessions(prev => {
      return prev.map(s => {
        if (s.id === sessionId) {
          return {
            ...s,
            violationsCount: s.violationsCount + 1,
            blockReason: breachType,
            lastActiveTime: new Date().toLocaleTimeString()
          };
        }
        return s;
      });
    });
  };

  // Check if teacher sent a remote block/unlock signal
  useEffect(() => {
    if (!studentName) return;
    const sessionId = studentName.toLowerCase().replace(/\s+/g, '-');
    const currentSession = sessions.find(s => s.id === sessionId);
    if (!currentSession) return;

    if (currentSession.status === 'Blocked' && currentScreen === 'webview') {
      triggerBlock("Kunci Remote dari Guru", true);
    } else if (currentSession.status === 'Active' && currentScreen === 'blocked') {
      // Remote unlocked
      setCurrentScreen('webview');
      setUnlockPin('');
      setUnlockError('');
      enterFullscreen();
      showToast('success', 'Ujian dibuka kembali oleh Guru.');
    }
  }, [sessions, studentName]);

  // Trigger Cheat Block screen
  const triggerBlock = (reason, isRemote = false) => {
    setCurrentScreen('blocked');
    exitFullscreen();
    updateSessionStatus('Blocked', reason);
    if (!isRemote) {
      incrementSessionViolation(reason);
      addViolationLog(studentName || 'Siswa', 'critical', reason);
      showToast('error', `Keamanan terpicu: ${reason}`);
    }
  };

  // Handle Automatic Violations without instantly locking the student screen
  const handleAutomaticViolation = (reason) => {
    incrementSessionViolation(reason);
    addViolationLog(studentName || 'Siswa', 'warning', reason);
    showToast('warn', `Keamanan terdeteksi: ${reason}`);
  };

  // FOCUS & INTERFACE GUARD SYSTEM: Detect focus loss, split screen, and fullscreen exit
  useEffect(() => {
    if (currentScreen !== 'webview') return;

    const handleBlur = () => {
      handleAutomaticViolation('Aplikasi Kehilangan Fokus (onPause / App Switching)');
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleAutomaticViolation('Membuka Aplikasi Lain (Tab Hidden)');
      }
    };

    const handleFullscreenChange = () => {
      // If student exits fullscreen while on the webview screen, warn but don't lock
      if (!document.fullscreenElement && currentScreen === 'webview') {
        handleAutomaticViolation('Keluar dari Mode Layar Penuh (Fullscreen Exited)');
      }
    };

    const handleResize = () => {
      // Split screen detection: check if height drops too low or changes significantly
      // On mobile, height less than 450px usually indicates split-screen
      const height = window.innerHeight;
      if (height < 450) {
        handleAutomaticViolation('Deteksi Layar Belah / Split-screen (Tinggi Layar < 450px)');
      }
    };

    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentScreen, studentName]);

  // INPUT PROTECTION SYSTEM: context menu, screenshots, copy-paste
  useEffect(() => {
    if (currentScreen !== 'webview') return;

    // 1. Right Click Block
    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerToastHint('Klik Kanan Diblokir!');
      addViolationLog(studentName, 'warning', 'Mencoba klik kanan (Context Menu)');
      incrementSessionViolation('Mencoba Klik Kanan');
    };

    // 2. Keyboard shortcut blocks & Screenshot blackout simulation
    const handleKeyDown = (e) => {
      // Copy Paste keys
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'x')) {
        e.preventDefault();
        triggerToastHint('Copy & Paste Dinonaktifkan!');
        addViolationLog(studentName, 'warning', `Mencoba shortcut Copy/Paste (${e.key.toUpperCase()})`);
        incrementSessionViolation('Mencoba Copy/Paste');
        // Clear clipboard
        navigator.clipboard.writeText('');
      }

      // Print screen / screenshot simulation keys
      if (e.key === 'PrintScreen' || (e.altKey && e.key === 'PrintScreen') || (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4'))) {
        e.preventDefault();
        setBlackoutActive(true);
        setTimeout(() => {
          setBlackoutActive(false);
          handleAutomaticViolation('Tangkapan Layar/Perekaman Terdeteksi');
        }, 1500);
      }
    };

    // 3. Clear clipboard buffer on window focus
    const handleFocus = () => {
      navigator.clipboard.writeText('');
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('focus', handleFocus);
    };
  }, [currentScreen, studentName]);

  const triggerToastHint = (text) => {
    setToastHint({ show: true, text });
    setTimeout(() => {
      setToastHint({ show: false, text: '' });
    }, 2000);
  };

  // Welcome Screen actions
  const handleStartExam = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      showToast('error', 'Masukkan nama siswa terlebih dahulu.');
      return;
    }
    
    // If enteredUrl is provided, they are entering via link/QR.
    const isEnteringViaLinkOrQR = !!enteredUrl.trim();
    
    if (!isEnteringViaLinkOrQR && enteredToken.trim() !== examToken) {
      showToast('error', 'Token Ujian tidak valid!');
      return;
    }
    
    // Success, start exam
    setCurrentScreen('webview');
    updateSessionStatus('Active');
    addViolationLog(studentName, 'info', `Berhasil masuk ke ujian ${isEnteringViaLinkOrQR ? '(Link/QR)' : '(Token Valid)'}`);
    enterFullscreen();
    showToast('success', 'Ujian dimulai! Mode Fullscreen aktif.');
  };

  const triggerMockScan = (type) => {
    setScanText(`QR Code [${type.toUpperCase()}] Terdeteksi! Memverifikasi...`);
    setTimeout(() => {
      if (type === 'default') {
        setEnteredToken('');
        setEnteredUrl(examUrl);
        showToast('success', 'Link Ujian terisi otomatis (Bypass Token)!');
      } else if (type === 'google') {
        setEnteredToken('');
        setEnteredUrl('https://docs.google.com/forms/d/e/1FAIpQLSfMockGoogleFormsMathQuiz/viewform');
        showToast('success', 'Link Google Forms terisi otomatis (Bypass Token)!');
      } else if (type === 'moodle') {
        setEnteredToken('');
        setEnteredUrl('https://moodle.sman1lasolo.sch.id/mod/quiz/view.php?id=455');
        showToast('success', 'Link Moodle Sekolah terisi otomatis (Bypass Token)!');
      }
      setCurrentScreen('welcome');
    }, 1500);
  };

  const handleScanQRCode = (source = 'main_menu') => {
    setScannerSource(source);
    setCurrentScreen('qr_scanner');
    setScanText('Arahkan kamera ke QR Code ujian... atau pilih template di bawah:');
  };

  const startCamera = async () => {
    stopCamera();
    try {
      const constraints = {
        video: { facingMode: cameraFacingMode }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      console.warn("Camera access denied or unavailable:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const toggleCameraFacing = () => {
    setCameraFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    showToast('info', `Mengaktifkan kamera ${cameraFacingMode === 'environment' ? 'depan (selfie)' : 'belakang'}`);
  };

  useEffect(() => {
    if (currentScreen !== 'qr_scanner') {
      stopCamera();
      return;
    }
    startCamera();
    return () => stopCamera();
  }, [currentScreen, cameraFacingMode]);

  const handleUnlockPin = (e) => {
    e.preventDefault();
    if (unlockPin === masterPin) {
      setCurrentScreen('webview');
      setUnlockPin('');
      setUnlockError('');
      updateSessionStatus('Active');
      addViolationLog(studentName, 'info', 'Ujian dibuka kembali (PIN Guru Valid)');
      enterFullscreen();
      showToast('success', 'Aplikasi berhasil dibuka kembali.');
    } else {
      setUnlockError('PIN Salah! Silakan minta PIN yang benar kepada Guru.');
      addViolationLog(studentName, 'warning', `Mencoba membuka kunci dengan PIN salah: "${unlockPin}"`);
    }
  };

  const handleSelectAnswer = (qId, optionKey) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionKey
    }));
  };

  const handleFinishExam = () => {
    setCurrentScreen('finished');
    exitFullscreen();
    updateSessionStatus('Completed');
    addViolationLog(studentName, 'info', 'Siswa menyelesaikan ujian dengan sukses');
    showToast('success', 'Ujian selesai dikerjakan!');
  };

  const handleCheckPassword = (e) => {
    e.preventDefault();
    const cleanInput = passwordInput.trim().toLowerCase();
    const cleanToken = examToken.trim().toLowerCase();
    const cleanPin = masterPin.trim().toLowerCase();
    
    if (cleanInput === 'lasolo' || cleanInput === cleanToken || cleanInput === cleanPin || cleanInput === 'admin') {
      setCurrentScreen('main_menu');
      setPasswordInput('');
      showToast('success', 'Aplikasi berhasil dibuka!');
    } else {
      showToast('error', 'Password salah! Silakan coba lagi.');
    }
  };

  const getGreeting = () => {
    const hour = parseInt(currentTimeStr.split(':')[0], 10) || 12;
    if (hour >= 5 && hour < 11) {
      return { text: 'Hallo, Selamat Pagi', icon: '☀️' };
    } else if (hour >= 11 && hour < 15) {
      return { text: 'Hallo, Selamat Siang', icon: '🌤️' };
    } else if (hour >= 15 && hour < 19) {
      return { text: 'Hallo, Selamat Sore', icon: '🌇' };
    } else {
      return { text: 'Hallo, Selamat Malam', icon: '🌙' };
    }
  };

  const handleRecentClick = () => {
    if (currentScreen === 'webview') {
      handleAutomaticViolation('Siswa menekan tombol Recent Apps (App Minimizing)');
    } else {
      showToast('info', 'Recent Apps dinonaktifkan di luar ujian.');
    }
  };

  const handleHomeClick = () => {
    if (currentScreen === 'webview') {
      handleAutomaticViolation('Siswa menekan tombol Home (App Minimized)');
    } else {
      setCurrentScreen('password_lock');
      showToast('info', 'Kembali ke halaman kunci.');
    }
  };

  const handleBackClick = () => {
    if (currentScreen === 'webview') {
      showToast('warn', 'Tombol Kembali dikunci selama ujian.');
    } else if (currentScreen === 'welcome') {
      setCurrentScreen('main_menu');
    } else if (currentScreen === 'qr_scanner') {
      setCurrentScreen('main_menu');
    } else if (currentScreen === 'main_menu') {
      setCurrentScreen('password_lock');
    } else if (currentScreen === 'finished') {
      showToast('info', 'Ujian selesai. Silakan hubungi pengawas.');
    } else {
      showToast('info', 'Kembali.');
    }
  };

  const formatTimer = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // Dynamic status border for mockup
  const getMockupStatusClass = () => {
    if (currentScreen === 'blocked') return 'screen-alert';
    if (blackoutActive) return 'screen-alert';
    if (currentScreen === 'webview') return 'screen-warning';
    return '';
  };

  return (
    <div className="student-section">
      <div className={`phone-mockup ${getMockupStatusClass()}`}>
        
        {/* Notch overlay */}
        <div className="phone-notch">
          <div className="notch-speaker"></div>
          <div className="notch-camera"></div>
        </div>

        {/* Status Bar */}
        <div className="phone-statusbar">
          <div className="statusbar-left">{currentTimeStr}</div>
          <div className="statusbar-right">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Screen Area */}
        <div className="phone-screen">
          
          {/* 1. Password Lock Screen (Gambar 1) */}
          {currentScreen === 'password_lock' && (
            <div className="password-lock-screen">
              <div className="bg-shape-left"></div>
              <div className="bg-shape-bottom-blue"></div>
              <div className="bg-shape-bottom-cyan"></div>

              <div className="lock-title-container">
                <h2 className="lock-title">EXAMBROWSER SMAN 1<br />LASOLO</h2>
              </div>

              <div className="lock-logo-wrapper">
                <img src="/sman_1_lasolo_logo.png" alt="SMAN 1 Lasolo Logo" className="lock-logo" />
              </div>

              <form onSubmit={handleCheckPassword} className="lock-form">
                <input
                  type="password"
                  className="lock-input"
                  placeholder="Masukan Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
                <button type="submit" className="lock-btn">
                  CEK
                </button>
              </form>

              <div className="lock-version">VERSI 7.5</div>
            </div>
          )}

          {/* 2. Main Menu Dashboard Screen (Gambar 2) */}
          {currentScreen === 'main_menu' && (
            <div className="main-menu-screen">
              <div className="main-menu-header">
                <div className="menu-time-str">{currentTimeStr}:00</div>
                <div className="menu-greeting-row">
                  <span className="menu-greeting-icon">{getGreeting().icon}</span>
                  <h3>{getGreeting().text}</h3>
                </div>
                <div className="menu-quote">
                  "Ilmu bukanlah apa yang dihafal, akan tetapi yang bermanfaat"
                </div>
                
                {/* SVG slanted pencils */}
                <PencilsIcon />
              </div>

              <div className="menu-white-card">
                {/* Carousel Banner */}
                <div className="menu-banner-wrapper">
                  {activeBannerSlide === 0 && (
                    <img src="/exambrowser_banner.png" alt="Exambrowser Banner" className="menu-banner-img" />
                  )}
                  {activeBannerSlide === 1 && (
                    <div className="banner-slide-styled" style={{
                      height: '145px',
                      background: 'linear-gradient(135deg, #1e3a8a, #0d9488)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#ffffff',
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>UJIAN JUJUR & BERINTEGRITAS</h4>
                      <p style={{ fontSize: '0.6rem', color: '#e2e8f0', marginTop: '0.25rem', lineHeight: '1.3' }}>
                        "Prestasi penting, jujur yang utama. Mari wujudkan ujian yang bersih dan transparan."
                      </p>
                    </div>
                  )}
                  {activeBannerSlide === 2 && (
                    <div className="banner-slide-styled" style={{
                      height: '145px',
                      background: 'linear-gradient(135deg, #0f172a, #334155)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: '#ffffff',
                      padding: '1rem'
                    }}>
                      <img src="/sman_1_lasolo_logo.png" alt="Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
                      <div style={{ textAlign: 'left' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 800 }}>SMAN 1 LASOLO</h4>
                        <p style={{ fontSize: '0.55rem', color: '#94a3b8', marginTop: '0.2rem', lineHeight: '1.2' }}>
                          Kec. Lasolo, Kabupaten Konawe Utara, Sulawesi Tenggara.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="menu-banner-dots">
                  <span className={`banner-dot ${activeBannerSlide === 0 ? 'active' : ''}`} onClick={() => setActiveBannerSlide(0)}></span>
                  <span className={`banner-dot ${activeBannerSlide === 1 ? 'active' : ''}`} onClick={() => setActiveBannerSlide(1)}></span>
                  <span className={`banner-dot ${activeBannerSlide === 2 ? 'active' : ''}`} onClick={() => setActiveBannerSlide(2)}></span>
                </div>

                {/* 5 Grid Buttons */}
                <div className="menu-grid">
                  <div className="menu-item-wrapper" onClick={() => handleScanQRCode('main_menu')}>
                    <div className="menu-circle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><line x1="14" y1="14" x2="14.01" y2="14" strokeWidth="3"/><line x1="17" y1="14" x2="17" y2="17"/><line x1="14" y1="17" x2="14" y2="17"/></svg>
                    </div>
                    <span className="menu-label">SCAN QRCODE</span>
                  </div>

                  <div className="menu-item-wrapper" onClick={() => setShowInstructionModal(true)}>
                    <div className="menu-circle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/><path d="M14 13l3 3-3 3"/></svg>
                    </div>
                    <span className="menu-label">MASUK</span>
                  </div>

                  <div className="menu-grid-row-2">
                    <div className="menu-item-wrapper" onClick={() => setShowDeveloperModal(true)}>
                      <div className="menu-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/></svg>
                      </div>
                      <span className="menu-label">DEVELOPER</span>
                    </div>

                    <div className="menu-item-wrapper" onClick={() => setShowBantuanModal(true)}>
                      <div className="menu-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                      </div>
                      <span className="menu-label">BANTUAN</span>
                    </div>

                    <div className="menu-item-wrapper" onClick={() => {
                      setCurrentScreen('password_lock');
                      showToast('info', 'Keluar dari Dashboard.');
                    }}>
                      <div className="menu-circle exit-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(-45 12 12)"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
                      </div>
                      <span className="menu-label">EXIT</span>
                    </div>
                  </div>
                </div>

                <div className="menu-card-footer">
                  EXAMBROWSER SMAN 1 LASOLO
                </div>
              </div>
            </div>
          )}
          
          {/* 3. Welcome/Login Form Screen */}
          {currentScreen === 'welcome' && (
            <div className="student-welcome">
              <div className="welcome-logo">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <img src="/sman_1_lasolo_logo.png" alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                </div>
                <h2>Exambrow Student</h2>
                <p>Ujian Aman SMAN 1 Lasolo</p>
              </div>

              <form onSubmit={handleStartExam} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginTop: '0.5rem' }}>
                <div className="form-group">
                  <label htmlFor="student-name">Nama Lengkap Siswa</label>
                  <input
                    id="student-name"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Ahmad Dani"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="student-class">Kelas / Jurusan</label>
                  <input
                    id="student-class"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: XII MIPA 3"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                  />
                </div>

                {!enteredUrl.trim() ? (
                  <div className="form-group">
                    <label htmlFor="exam-token">Token Ujian</label>
                    <div className="input-with-action">
                      <input
                        id="exam-token"
                        type="text"
                        className="form-input"
                        style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}
                        placeholder="Masukkan Token Guru"
                        value={enteredToken}
                        onChange={(e) => setEnteredToken(e.target.value.toUpperCase())}
                        required={!enteredUrl.trim()}
                      />
                      <button
                        type="button"
                        className="btn-icon-only"
                        onClick={() => handleScanQRCode('welcome')}
                        title="Scan QR Code"
                      >
                        📷
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="token-bypass-badge" style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px dashed #10b981',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.75rem',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>✓ Masuk via Link/QR (Token tidak diperlukan)</span>
                    <button 
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.75rem'
                      }}
                      onClick={() => {
                        setEnteredUrl('');
                        setEnteredToken('');
                      }}
                    >
                      Hapus Link
                    </button>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="exam-url">URL Soal Ujian</label>
                  <input
                    id="exam-url"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: https://docs.google.com/forms/..."
                    value={enteredUrl}
                    onChange={(e) => setEnteredUrl(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '0.25rem', backgroundColor: '#0284c7', backgroundImage: 'none', color: '#fff' }}>
                  Mulai Ujian Sekarang
                </button>
              </form>

              <div className="security-warning-card" style={{ marginTop: '0.75rem' }}>
                <div className="warning-header">
                  <span>⚠️ Proteksi Aktif</span>
                </div>
                <p>
                  Aplikasi ini mendeteksi perpindahan fokus, screenshot, split-screen, dan penyalinan teks. Pelanggaran akan dilaporkan secara otomatis ke Guru untuk dikunci secara manual.
                </p>
              </div>
            </div>
          )}







          {/* QR Scanner Screen */}
          {currentScreen === 'qr_scanner' && (
            <div className="qr-scanner-overlay">
              <div className="scanner-header">
                <h3>QR Scanner Ujian</h3>
                <button className="btn-icon-only" onClick={() => setCurrentScreen(scannerSource)}>
                  <BackIcon />
                </button>
              </div>
              
              <div className="scanner-body">
                <div className="scanner-viewfinder">
                  <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: cameraFacingMode === 'user' ? 'scaleX(-1)' : 'none' }}></video>
                  <div className="scanner-line"></div>
                </div>
              </div>

              <div className="scanner-text" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <p>{scanText}</p>
                
                <button 
                  className="qr-select-btn" 
                  style={{ backgroundColor: 'rgba(0, 210, 255, 0.15)', borderColor: '#00d2ff', color: '#00d2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontWeight: 'bold' }}
                  onClick={toggleCameraFacing}
                >
                  🔄 Ganti Kamera ({cameraFacingMode === 'environment' ? 'Depan' : 'Belakang'})
                </button>
                
                <div className="qr-select-container">
                  <span className="qr-select-title">Simulasikan Pindai QR Soal:</span>
                  <button className="qr-select-btn" onClick={() => triggerMockScan('default')}>
                    📸 Scan Barcode Ujian Bawaan Guru
                  </button>
                  <button className="qr-select-btn" onClick={() => triggerMockScan('google')}>
                    📸 Scan Barcode Google Forms Quiz
                  </button>
                  <button className="qr-select-btn" onClick={() => triggerMockScan('moodle')}>
                    📸 Scan Barcode Moodle SMAN 1 Lasolo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* WebView Screen */}
          {currentScreen === 'webview' && (
            <div className="student-webview">
              <div className="webview-header">
                <span className="webview-url">{enteredUrl}</span>
                <div className="webview-status-icons" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    className={`webview-mode-toggle ${webviewMode === 'simulated' ? 'simulated-active' : ''}`}
                    onClick={() => {
                      setWebviewMode(prev => prev === 'iframe' ? 'simulated' : 'iframe');
                      showToast('info', `Beralih ke mode ${webviewMode === 'iframe' ? 'Simulasi' : 'Iframe Asli'}`);
                    }}
                    title="Beralih antara Tampilan Iframe Real dan Simulasi Form"
                  >
                    {webviewMode === 'iframe' ? '👁️ Lihat Simulasi' : '🌐 Lihat Iframe'}
                  </button>
                  <RefreshIcon />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e53e3e' }}>🔒 Secure Mode</span>
                </div>
              </div>

              {/* WebView Body */}
              <div className="webview-body" style={{ padding: webviewMode === 'iframe' ? '0' : '1.25rem' }} ref={webviewBodyRef}>
                {webviewMode === 'iframe' ? (
                  <iframe
                    src={enteredUrl}
                    title="Ujian Pihak Ketiga"
                    style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#ffffff' }}
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                ) : (
                  enteredUrl.toLowerCase().includes('google') || enteredUrl.toLowerCase().includes('form') ? (
                    /* Google Forms Mockup */
                    <div className="google-form-mockup">
                      <div className="gform-header-banner"></div>
                      <div style={{ padding: '0.75rem' }}>
                        
                        <div className="gform-card gform-title-card">
                          <h2 className="gform-exam-title">Evaluasi Belajar SMAN 1 Lasolo</h2>
                          <div className="gform-exam-desc">
                            Ujian Pilihan Ganda Matematika - Terintegrasi Google Forms
                            <p style={{ color: '#d93025', fontSize: '0.7rem', marginTop: '0.35rem' }}>* Menunjukkan pertanyaan yang wajib diisi</p>
                          </div>
                        </div>

                        <div className="gform-card">
                          <div className="gform-question-text">Nama Lengkap Siswa <span className="gform-required-star">*</span></div>
                          <input type="text" className="gform-input" placeholder="Jawaban Anda" defaultValue={studentName} readOnly />
                        </div>

                        <div className="gform-card">
                          <div className="gform-question-text">Kelas / Jurusan <span className="gform-required-star">*</span></div>
                          <input type="text" className="gform-input" placeholder="Jawaban Anda" defaultValue={studentClass || 'XII MIPA 1'} readOnly />
                        </div>

                        <div className="gform-card">
                          <div className="gform-question-text">Tentukan turunan pertama dari fungsi f(x) = 3x^2 - 5x + 8. <span className="gform-required-star">*</span></div>
                          <div className="gform-option-item" onClick={() => setSelectedGFormAnswers(p => ({...p, q1: 'A'}))}>
                            <div className={`gform-option-radio ${selectedGFormAnswers.q1 === 'A' ? 'selected' : ''}`}>
                              {selectedGFormAnswers.q1 === 'A' && <div className="gform-radio-dot"></div>}
                            </div>
                            <span>f'(x) = 6x - 5</span>
                          </div>
                          <div className="gform-option-item" onClick={() => setSelectedGFormAnswers(p => ({...p, q1: 'B'}))}>
                            <div className={`gform-option-radio ${selectedGFormAnswers.q1 === 'B' ? 'selected' : ''}`}>
                              {selectedGFormAnswers.q1 === 'B' && <div className="gform-radio-dot"></div>}
                            </div>
                            <span>f'(x) = 6x + 8</span>
                          </div>
                          <div className="gform-option-item" onClick={() => setSelectedGFormAnswers(p => ({...p, q1: 'C'}))}>
                            <div className={`gform-option-radio ${selectedGFormAnswers.q1 === 'C' ? 'selected' : ''}`}>
                              {selectedGFormAnswers.q1 === 'C' && <div className="gform-radio-dot"></div>}
                            </div>
                            <span>f'(x) = 3x - 5</span>
                          </div>
                        </div>

                        <div className="gform-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <button className="gform-btn-submit" onClick={handleFinishExam}>Kirim</button>
                          <span style={{ fontSize: '0.65rem', color: '#70757a' }}>Kirim formulir ini dengan aman.</span>
                        </div>
                      </div>
                    </div>
                  ) : enteredUrl.toLowerCase().includes('moodle') ? (
                    /* Moodle Mockup */
                    <div className="moodle-mockup">
                      <div className="moodle-header">
                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ff8c00' }}>Moodle</span>
                        <span className="moodle-nav-info">SMAN 1 Lasolo LMS / Kuis Biologi</span>
                      </div>
                      
                      <div className="moodle-card">
                        <div className="moodle-quiz-info">
                          <strong>Kuis Tengah Semester Biologi Seluler</strong><br />
                          Waktu pengerjaan tersisa: <span style={{ color: '#d9534f', fontWeight: 'bold' }}>{formatTimer(timeLeft)}</span>
                        </div>

                        <div className="moodle-question-container">
                          <div className="moodle-qinfo-panel">
                            <span>Soal <strong className="moodle-qnumber">1</strong></span>
                            <span>Belum dijawab</span>
                            <span>Poin maks 1,00</span>
                          </div>
                          <div className="moodle-qcontent-panel">
                            <div className="moodle-question-text">
                              Manakah di bawah ini yang merupakan organel sel penghasil energi utama (ATP) pada sel eukariotik?
                            </div>
                            <div className="moodle-option-list">
                              <div className="moodle-option-item" onClick={() => setSelectedMoodleAnswers(p => ({...p, q1: 'A'}))}>
                                <div className={`moodle-radio ${selectedMoodleAnswers.q1 === 'A' ? 'selected' : ''}`}>
                                  {selectedMoodleAnswers.q1 === 'A' && <div className="moodle-radio-inner"></div>}
                                </div>
                                <span>a. Mitokondria</span>
                              </div>
                              <div className="moodle-option-item" onClick={() => setSelectedMoodleAnswers(p => ({...p, q1: 'B'}))}>
                                <div className={`moodle-radio ${selectedMoodleAnswers.q1 === 'B' ? 'selected' : ''}`}>
                                  {selectedMoodleAnswers.q1 === 'B' && <div className="moodle-radio-inner"></div>}
                                </div>
                                <span>b. Ribosom</span>
                              </div>
                              <div className="moodle-option-item" onClick={() => setSelectedMoodleAnswers(p => ({...p, q1: 'C'}))}>
                                <div className={`moodle-radio ${selectedMoodleAnswers.q1 === 'C' ? 'selected' : ''}`}>
                                  {selectedMoodleAnswers.q1 === 'C' && <div className="moodle-radio-inner"></div>}
                                </div>
                                <span>c. Kloroplas</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button className="moodle-btn-next" onClick={handleFinishExam}>Halaman selanjutnya</button>
                      </div>
                    </div>
                  ) : (
                    /* Default Mock Exam */
                    <>
                      <div className="mock-exam-title">Evaluasi Akhir Matematika</div>
                      <div className="mock-exam-desc">Ujian Matematika Wajib - SMAN 1 Lasolo</div>

                      <div className="exam-meta">
                        <span>Nama: <strong>{studentName}</strong></span>
                        <span className="exam-timer">{formatTimer(timeLeft)}</span>
                      </div>

                      {MOCK_QUESTIONS.map((q, idx) => (
                        <div key={q.id} className="exam-question">
                          <div className="question-text">
                            {idx + 1}. {q.question}
                          </div>
                          <div className="option-list">
                            {q.options.map(opt => (
                              <div
                                key={opt.key}
                                className={`option-item ${selectedAnswers[q.id] === opt.key ? 'selected' : ''}`}
                                onClick={() => handleSelectAnswer(q.id, opt.key)}
                              >
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: '1px solid currentColor',
                                  marginRight: '8px',
                                  fontSize: '0.7rem'
                                }}>
                                  {opt.key}
                                </span>
                                <span>{opt.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <button className="btn-webview-submit" onClick={handleFinishExam}>
                        Kirim & Akhiri Ujian
                      </button>
                    </>
                  )
                )}
              </div>

              {/* Toast Copy Hint */}
              <div className={`copy-block-hint ${toastHint.show ? 'show' : ''}`}>
                ❌ {toastHint.text}
              </div>

              {/* Screenshot Blackout Overlay */}
              <div className={`screenshot-blackout ${blackoutActive ? 'active' : ''}`}>
                <div className="blackout-icon">🚫</div>
                <h3>Perekaman Layar Terdeteksi</h3>
                <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginTop: '0.5rem' }}>
                  Tangkapan layar dan perekaman video dilarang oleh sistem keamanan Exambrow. Layar disamarkan secara otomatis.
                </p>
              </div>

            </div>
          )}

          {/* Blocked/Cheated screen */}
          {currentScreen === 'blocked' && (
            <div className="student-blocked">
              <div className="block-header">
                <span className="block-icon">🚨</span>
                <h2>Ujian Anda Dikunci!</h2>
                <p>
                  Sistem keamanan mendeteksi upaya keluar dari aplikasi ujian (app-switching atau shortcut bypass).
                </p>
              </div>

              <div className="block-reason-box">
                <span className="reason-title">Pelanggaran Terdeteksi</span>
                <div className="reason-content">
                  {sessions.find(s => s.id === studentName.toLowerCase().replace(/\s+/g, '-'))?.blockReason || 'Deteksi Manipulasi Fokus'}
                </div>
                <div className="reason-time">
                  Waktu Kunci: {sessions.find(s => s.id === studentName.toLowerCase().replace(/\s+/g, '-'))?.lastActiveTime || new Date().toLocaleTimeString()}
                </div>
              </div>

              <form onSubmit={handleUnlockPin} className="unlock-form">
                <label htmlFor="unlock-pin">Masukkan PIN Guru untuk Membuka Kunci</label>
                <div className="pin-input-group">
                  <input
                    id="unlock-pin"
                    type="password"
                    maxLength="6"
                    className="form-input"
                    placeholder="••••"
                    value={unlockPin}
                    onChange={(e) => setUnlockPin(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-unlock">
                  Verifikasi PIN & Buka Ujian
                </button>
                {unlockError && <div className="unlock-error">{unlockError}</div>}
              </form>

              <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94a3b8' }}>
                ID Perangkat: EX-BRW-889A-992B
              </div>
            </div>
          )}

          {/* Success Finished screen */}
          {currentScreen === 'finished' && (
            <div className="student-welcome" style={{ justifyContent: 'center', gap: '2rem' }}>
              <div className="welcome-logo">
                <div className="logo-icon" style={{ color: '#0ea5e9' }}>🎉</div>
                <h2>Ujian Selesai!</h2>
                <p style={{ color: '#0ea5e9', fontWeight: 600 }}>Jawaban Anda telah terkirim secara aman.</p>
              </div>

              <div className="security-warning-card" style={{ borderColor: 'rgba(14, 165, 233, 0.2)', background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.05), transparent)' }}>
                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
                  Terima kasih telah mengikuti ujian dengan jujur. Anda dipersilakan untuk mengembalikan HP ke pengawas atau menutup tab aplikasi ini.
                </p>
              </div>

              {/* No back button here as per requirements to prevent exiting finished state */}
            </div>
          )}

          {/* 4. Petunjuk Ujian Modal (Gambar 3) */}
          {showInstructionModal && (
            <div className="rules-modal-overlay">
              <div className="rules-modal-box">
                <img src="/sman_1_lasolo_logo.png" alt="SMAN 1 Lasolo Logo" className="rules-logo" />
                <h3 className="rules-title">EXAMBROWSER SMAN 1 LASOLO</h3>
                <p className="rules-subtitle">
                  Dibawah ini fungsi telepon yang akan dimatikan saat ujian berlangsung dan akan normal kembali setelah keluar dari aplikasi.
                </p>

                <div className="rules-disabled-list">
                  <div className="disabled-rule-item">❌ Screenshot</div>
                  <div className="disabled-rule-item">❌ Sembunyikan navigasi</div>
                  <div className="disabled-rule-item">❌ Tombol Kembali, Home, Recent</div>
                  <div className="disabled-rule-item">❌ Dual Layar</div>
                </div>

                <div className="rules-list-section">
                  <div className="rules-list-header">Bacalah dengan seksama petunjuk UJIAN dibawah ini:</div>
                  <ol className="rules-ol">
                    <li>Berdoa sebelum ujian dimulai.</li>
                    <li>Ikuti dan patuhi petunjuk dan instruksi dari pengawas ujian.</li>
                    <li>Pada saat <strong>LOGIN</strong>, pastikan <strong>NAMA</strong>, <strong>NO.PESERTA</strong> dan <strong>PASSWORD</strong> sesuai dengan data pada KARTU UJIAN.</li>
                    <li>Masukan <strong>USERNAME</strong> dan <strong>PASSWORD</strong> pada kolom ujian.</li>
                    <li>Pilih mata pelajaran sesuai dengan <strong>JADWAL UJIAN</strong>.</li>
                    <li>Jika anda sudah <strong>LOGIN</strong>, maka anda tidak bisa membuka <strong>JENDELA/APLIKASI</strong> lain yang ada di perangkat smartphone anda.</li>
                    <li>Jika anda mencoba untuk <strong>KELUAR</strong> dari aplikasi ini pada saat ujian berlangsung, maka halaman ujian secara otomatis me-refresh dari awal.</li>
                    <li>Setelah <strong>SELESAI</strong> mengerjakan soal, jangan lupa untuk konfirmasi <strong>SELESAI</strong>, kemudian <strong>LOGOUT</strong>.</li>
                    <li>Kerjakan soal ujian dengan <strong>JUJUR</strong> dan tanpa ada <strong>KECURANGAN</strong>.</li>
                    <li>Selamat mengerjakan, semoga mendapatkan hasil yang terbaik.</li>
                  </ol>
                </div>

                <button
                  className="rules-btn"
                  onClick={() => {
                    setShowInstructionModal(false);
                    setCurrentScreen('welcome');
                  }}
                >
                  LANJUTKAN
                </button>
              </div>
            </div>
          )}

          {/* 5. Developer Modal */}
          {showDeveloperModal && (
            <div className="rules-modal-overlay" onClick={() => setShowDeveloperModal(false)}>
              <div className="rules-modal-box info-modal-box" onClick={(e) => e.stopPropagation()}>
                <h3 className="info-modal-title">Info Developer</h3>
                <div style={{ fontSize: '0.75rem', lineHeight: '1.5', textAlign: 'center', margin: '1rem 0' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#38bdf8' }}>SMAN 1 LASOLO IT TEAM</p>
                  <p style={{ marginTop: '0.5rem', color: '#94a3b8' }}>Sistem Exambrow Guard v7.5</p>
                  <p style={{ marginTop: '0.25rem', color: '#94a3b8' }}>Mendukung Kiosk Mode Terintegrasi untuk Android, Chromebook, dan iOS.</p>
                  <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#64748b' }}>"Teknologi Untuk Kejujuran Pendidikan"</p>
                </div>
                <button className="rules-btn" onClick={() => setShowDeveloperModal(false)}>TUTUP</button>
              </div>
            </div>
          )}

          {/* 6. Bantuan Modal */}
          {showBantuanModal && (
            <div className="rules-modal-overlay" onClick={() => setShowBantuanModal(false)}>
              <div className="rules-modal-box info-modal-box" onClick={(e) => e.stopPropagation()}>
                <h3 className="info-modal-title">Bantuan Ujian</h3>
                <div style={{ fontSize: '0.7rem', lineHeight: '1.4', textAlign: 'left', margin: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    <strong>1. Bagaimana cara mulai ujian?</strong>
                    <p style={{ color: '#94a3b8' }}>Masuk menu utama &gt; klik MASUK &gt; baca petunjuk &gt; Klik LANJUTKAN &gt; Isi nama, kelas, token &gt; Klik Mulai.</p>
                  </div>
                  <div>
                    <strong>2. Token tidak valid?</strong>
                    <p style={{ color: '#94a3b8' }}>Minta Token Ujian terbaru kepada Pengawas di kelas. Atau scan barcode QR ujian jika tersedia.</p>
                  </div>
                  <div>
                    <strong>3. Layar terkunci secara remote oleh Guru?</strong>
                    <p style={{ color: '#94a3b8' }}>Hubungi Guru/Pengawas untuk membuka kunci layar Anda. Atau minta PIN Bypass 4 digit kepada pengawas.</p>
                  </div>
                </div>
                <button className="rules-btn" onClick={() => setShowBantuanModal(false)}>TUTUP</button>
              </div>
            </div>
          )}

          {/* Android Navigation Soft-Keys Mockup at bottom */}
          {currentScreen !== 'webview' && (
            <div className="android-softkeys">
              <div className="softkey-btn" onClick={handleRecentClick} title="Recent Apps">
                {/* 3 lines for recent */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="5" x2="8" y2="19"/><line x1="12" y1="5" x2="12" y2="19"/><line x1="16" y1="5" x2="16" y2="19"/></svg>
              </div>
              <div className="softkey-btn" onClick={handleHomeClick} title="Home">
                {/* Rounded square for home */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="5" y="5" width="14" height="14" rx="3" ry="3"/></svg>
              </div>
              <div className="softkey-btn" onClick={handleBackClick} title="Back">
                {/* Left chevron for back */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </div>
            </div>
          )}

          {/* Navigation Bar indicator (Home gesture bar mockup) for WebView only */}
          {currentScreen === 'webview' && (
            <div
              className="phone-home-indicator"
              onClick={() => {
                handleAutomaticViolation('Siswa menekan Tombol Home / Navigasi Keluar (App Minimized)');
              }}
              title="Ketuk untuk Meniru Menekan Tombol Home HP"
            ></div>
          )}

        </div>
      </div>
      
      {/* Dynamic Instruction tag for sandbox help */}
      <div style={{
        marginTop: '1rem',
        fontSize: '0.75rem',
        color: 'hsl(var(--text-muted))',
        backgroundColor: 'hsl(var(--bg-card))',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid hsl(var(--border))',
        width: '390px',
        textAlign: 'center'
      }}>
        💡 <strong>Mode Simulasi</strong>: Klik di luar HP atau klik tombol Home di bawah layar HP untuk mensimulasikan pelanggaran otomatis. Layar Anda tidak akan terkunci langsung, melainkan tercatat sebagai pelanggaran dan Guru dapat mengunci secara manual dari dashboard.
      </div>
    </div>
  );
}
