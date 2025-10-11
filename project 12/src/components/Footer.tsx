import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="py-6 sm:py-8 px-4 text-center">
      <p className="text-xs sm:text-sm text-[var(--muted)]">
        © 2025 Scan4Support – {language === 'hr' ? 'Projekt studentske podrške.' : 'Student Support Project.'}
      </p>
    </footer>
  );
}
