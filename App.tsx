
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import WelcomeScreen from './components/WelcomeScreen';
import DesktopWarning from './components/DesktopWarning';
import { AnimatePresence, motion } from 'framer-motion';




const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const NavigationHandler: React.FC<{
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
}> = ({ isPlaying, setIsPlaying, audioRef }) => {
  const location = useLocation();

  useEffect(() => {
    // When the path changes (navigation to a different page)
    // or when the location key changes (re-navigating to the same page/Home)
    // we stop the background music as requested.
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [location.pathname, location.key]);

  return null;
};

const Layout: React.FC<{
  children: React.ReactNode;
  isPlaying: boolean;
  onToggleMusic: () => void;
  onStopMusic: () => void;
  onGoHome: () => void;
}> = ({ children, isPlaying, onToggleMusic, onStopMusic, onGoHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('hero');

  // Logic to highlight active section on scroll using IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['hero', 'story', 'ceremonies', 'venue', 'gallery'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const navLinks = [
    { id: 'hero', label: 'Home', path: '/' },
    { id: 'story', label: 'Story', path: '/#story' },
    { id: 'ceremonies', label: 'Events', path: '/#ceremonies' },
    { id: 'venue', label: 'Location', path: '/#venue' },
    { id: 'gallery', label: 'Gallery', path: '/#gallery' }
  ];

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[500px] mx-auto bg-transparent shadow-2xl overflow-hidden shadow-black/20">

      {/* Music Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <button
          onClick={onToggleMusic}
          className="w-14 h-14 bg-[#D4AF37] text-[#B76E79] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.4)] border-2 border-white transition-all active:scale-90 hover:scale-105"
        >
          {isPlaying ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            </motion.div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
          )}
        </button>
      </div>

      {/* Hamburger Navigation */}
      <div className="fixed top-6 right-6 z-[60]">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-14 h-14 bg-[#D4AF37] text-[#B76E79] rounded-full flex flex-col items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(255,215,0,0.4)] border-2 border-white transition-all active:scale-90 hover:scale-105"
        >
          <div className={`w-6 h-0.5 bg-[#B76E79] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-[#B76E79] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-[#B76E79] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* Expanded Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-[#0A1C14]/80 backdrop-blur-2xl flex items-center justify-center transition-all duration-700 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="text-center">
          <ul className="space-y-8">
            {navLinks.map((link, idx) => (
              <li
                key={link.id}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`transition-all transform duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                {link.path.startsWith('/#') ? (
                  <a
                    href={link.path}
                    onClick={() => {
                      setIsMenuOpen(false);
                      // If navigating within the page, we might want to keep music?
                      // But the user said "switching from that page" should stop it.
                      // If they consider sections as "pages", they might want it to stop.
                      // However, most users would want it to continue.
                      // I will only stop it if they navigate to 'Home' specially.
                    }}
                    className={`text-3xl md:text-5xl font-traditional transition-all hover:tracking-widest ${activeSection === link.id && location.pathname === '/' ? 'text-[#D4AF37] scale-110 blur-0' : 'text-white/40 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (link.id === 'hero') {
                        onGoHome(); // This will stop music and show welcome screen
                      }
                    }}
                    className={`text-3xl md:text-5xl font-traditional transition-all hover:tracking-widest ${location.pathname === link.path ? 'text-[#D4AF37] scale-110 blur-0' : 'text-white/40 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-16 text-[#D4AF37] text-4xl animate-bounce">🪔</div>
        </div>
      </div>

      <main className="relative z-10">
        {children}
      </main>

      <footer className="pt-0 pb-12 bg-transparent text-center relative overflow-hidden z-0">
        <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <img
            src="/shiva.png"
            alt="Traditional Wedding Footer"
            className="w-full h-auto max-w-2xl mix-blend-multiply transform hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </footer>

      <section className="py-6 border-t border-[#B76E79]/15 bg-[#0A1C14]/70 backdrop-blur-sm text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-[10px] tracking-[0.25em] uppercase opacity-80 font-bold text-[#FDF5E6]">
            Designed by Sridhar Reddy Nalipi
          </p>
          <div className="mt-3 flex items-center justify-center gap-5 text-[11px] font-semibold tracking-widest uppercase text-[#FDF5E6]/70">
            <a
              href="https://wa.me/917386376302?text=Hi..%20I%20like%20that%20invitation%20very%20much.."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B76E79] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://bit.ly/nsr7831"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B76E79] transition-colors"
            >
              Portfolio
            </a>
            <a
              href="https://www.instagram.com/sridharreddy7831"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B76E79] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

const App: React.FC = () => {
  const [petals, setPetals] = useState<any[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Generate stable petal properties
    const dotColors = ['#D4AF37', '#FFCBA4', '#F08080', '#FFFFFF'];
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: 5 + Math.random() * 7,
      duration: 12 + Math.random() * 16,
      delay: Math.random() * 20,
      left: `${Math.random() * 100}%`,
      rotate: Math.random() * 360,
      swayDuration: 4 + Math.random() * 4,
      color: dotColors[i % dotColors.length]
    }));
    setPetals(newPetals);

    // Initialize audio
    audioRef.current = new Audio('/1.mp3');
    audioRef.current.loop = true;
  }, []);

  const handleOpenInvitation = () => {
    setShowWelcome(false);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsPlaying(true);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const goHome = () => {
    stopMusic();
    setShowWelcome(true);
    window.scrollTo(0, 0);
  };

  return (
    <Router>
      <DesktopWarning />
      <ScrollToTop />
      <NavigationHandler isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />

      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen key="welcome" onOpen={handleOpenInvitation} />
        )}
      </AnimatePresence>

      {/* Petal Falling Animation - Optimized with stable properties */}
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            animationDuration: `${petal.duration}s`,
            animationDelay: `-${petal.delay}s`,
          }}
        >
          <div
            className="petal-inner"
            style={{
              width: petal.size,
              height: petal.size,
              opacity: 0.65,
              transform: `rotate(${petal.rotate}deg)`,
              animationDuration: `${petal.swayDuration}s`,
              borderRadius: '9999px',
              background: petal.color,
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.4), 0 0 4px rgba(255, 255, 255, 0.6)'
            }}
          />
        </div>
      ))}

      <Layout
        isPlaying={isPlaying}
        onToggleMusic={toggleMusic}
        onStopMusic={stopMusic}
        onGoHome={goHome}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};


export default App;
