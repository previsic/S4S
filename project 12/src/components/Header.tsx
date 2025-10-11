import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${
      isScrolled ? 'bg-white/30 shadow-lg border-white/30' : 'bg-white/15 border-white/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <button
          onClick={() => window.location.reload()}
          className="transition-all duration-300 active:scale-95 p-1 -m-1 rounded-lg group"
          aria-label="Osvježi stranicu"
        >
          <img
            src="/Group 469.png"
            alt="Scan4Support"
            className="h-8 sm:h-10 md:h-12 w-auto transition-all duration-300 group-hover:[filter:brightness(0)_saturate(100%)_invert(72%)_sepia(18%)_saturate(878%)_hue-rotate(122deg)_brightness(94%)_contrast(88%)]"
          />
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('prijavi-problem')}
            className="text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
          >
            {t.nav.reportProblem}
          </button>
          <button
            onClick={() => scrollToSection('dodatna-pomoc')}
            className="text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
          >
            {t.nav.additionalHelp}
          </button>
          <button
            onClick={() => scrollToSection('o-projektu')}
            className="text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
          >
            {t.nav.aboutProject}
          </button>
          <button
            onClick={() => setLanguage(language === 'hr' ? 'en' : 'hr')}
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors px-2 py-1 rounded-lg hover:bg-[var(--accent)]/5"
            aria-label="Change language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{language === 'hr' ? 'EN' : 'HR'}</span>
          </button>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-[var(--ink)] hover:text-[var(--accent)] transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className={`transition-all duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-md bg-white/95 shadow-lg animate-slide-down overflow-hidden">
          <nav className="flex flex-col px-4 py-3 gap-1">
            <button
              onClick={() => scrollToSection('prijavi-problem')}
              className="text-left py-3 px-4 text-[var(--ink)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 rounded-lg transition-all font-medium hover:translate-x-1"
              style={{ animationDelay: '0.05s' }}
            >
              {t.nav.reportProblem}
            </button>
            <button
              onClick={() => scrollToSection('dodatna-pomoc')}
              className="text-left py-3 px-4 text-[var(--ink)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 rounded-lg transition-all font-medium hover:translate-x-1"
              style={{ animationDelay: '0.1s' }}
            >
              {t.nav.additionalHelp}
            </button>
            <button
              onClick={() => scrollToSection('o-projektu')}
              className="text-left py-3 px-4 text-[var(--ink)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 rounded-lg transition-all font-medium hover:translate-x-1"
              style={{ animationDelay: '0.15s' }}
            >
              {t.nav.aboutProject}
            </button>
            <button
              onClick={() => setLanguage(language === 'hr' ? 'en' : 'hr')}
              className="text-left py-3 px-4 text-[var(--ink)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 rounded-lg transition-all font-medium hover:translate-x-1 flex items-center gap-2"
              style={{ animationDelay: '0.2s' }}
            >
              <Globe className="w-5 h-5" />
              <span className="uppercase">{language === 'hr' ? 'EN' : 'HR'}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
