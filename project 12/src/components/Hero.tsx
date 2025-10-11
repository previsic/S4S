import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentMessage = t.hero.messages[messageIndex];

    if (isTyping) {
      if (displayText.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2200);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setMessageIndex((prev) => (prev + 1) % t.hero.messages.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, messageIndex, t.hero.messages]);

  return (
    <section className="relative pt-16 sm:pt-24 pb-6 sm:pb-8 px-4 min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center">
      <div className="hero-glow" aria-hidden="true" />
      <div className="floating-dots" aria-hidden="true" />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-2">
        <img
          src="/Group 473.png"
          alt="Logo"
          className="h-10 sm:h-14 md:h-16 lg:h-20 mx-auto mb-4 sm:mb-6 md:mb-8 mt-4 sm:mt-6"
        />
        <div className="relative mt-10 sm:mt-14 min-h-[3em] sm:min-h-[2.5em] flex items-center justify-center">
          <h1
            className="font-bold text-[var(--ink)] mb-3 sm:mb-6 text-[26px] leading-tight sm:text-4xl md:text-5xl"
            aria-live="polite"
          >
            {displayText}<span className="typewriter-cursor-inline"></span>
          </h1>
        </div>

      </div>
    </section>
  );
}
