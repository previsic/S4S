import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ReportForm from './components/ReportForm';
import LinkCards from './components/LinkCards';
import Partners from './components/Partners';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className="min-h-screen overflow-x-hidden relative bg-gradient-custom">
        <div className="animate-fade-in">
          <Header />
        </div>

        <main className="relative">
          <div className="animate-fade-in">
            <Hero />
          </div>

        <section id="prijavi-problem" className="px-4 pb-12 -mt-4 sm:-mt-2 relative z-10 scroll-mt-20 animate-fade-in">
          <ReportForm />
        </section>

        <section id="dodatna-pomoc" className="px-4 py-12 md:py-16 scroll-mt-20 animate-fade-in">
          <LinkCards />
        </section>

        <section id="o-projektu" className="px-4 py-12 md:py-16 scroll-mt-20 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[20px] sm:text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-5 sm:mb-6 text-center leading-tight">
              {t.aboutProject.title}
            </h2>
            <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8">
              <p className="text-[var(--ink)] leading-relaxed text-[14px] sm:text-base">
                {t.aboutProject.description}
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:py-16 animate-fade-in">
          <Partners />
        </section>
      </main>

      <div className="animate-fade-in">
        <Footer />
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[var(--accent)] text-white p-4 sm:p-4 rounded-full shadow-xl hover:opacity-90 transition-all duration-300 z-50 hover:scale-110 active:scale-95 animate-fade-in"
          aria-label="Scroll to top"
          style={{ boxShadow: '0 4px 16px rgba(93, 193, 185, 0.35)' }}
        >
          <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
        </button>
      )}
      </div>
    </>
  );
}

export default App;
