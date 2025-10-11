import { Heart, Users, Briefcase, HandHeart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LinkCards() {
  const { t, language } = useLanguage();

  const links = [
    {
      title: language === 'hr' ? 'Studentsko savjetovalište' : 'Student Counseling',
      url: 'https://savjetovaliste.sum.ba/',
      icon: Heart,
    },
    {
      title: language === 'hr' ? 'Ured za studente s invaliditetom' : 'Office for Students with Disabilities',
      url: 'https://www.sum.ba/sum/studenti/ured-za-podrsku-studentima',
      icon: Users,
    },
    {
      title: language === 'hr' ? 'Fond za socijalno ugrožene\u00A0studente' : 'Fund for Socially Disadvantaged Students',
      url: 'https://zaklada.sum.ba',
      icon: HandHeart,
    },
    {
      title: language === 'hr' ? 'Karijerno savjetovalište SUM' : 'SUM Career Counseling',
      url: 'https://www.sum.ba/sum/studenti/karijerno-savjetovaliste',
      icon: Briefcase,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto text-center px-4">
      <h2 className="text-[20px] sm:text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-2 sm:mb-3 leading-tight">
        {language === 'hr' ? 'Potrebna ti je dodatna pomoć?' : 'Do you need additional help?'}
      </h2>
      <p className="text-[var(--muted)] mb-6 sm:mb-8 text-[14px] sm:text-base md:text-lg font-light leading-relaxed">
        {language === 'hr' ? 'Javi se jednom od naših servisa' : 'Contact one of our services'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-5 bg-white text-[var(--ink)] rounded-2xl font-semibold text-[14px] sm:text-base shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:scale-105 transition-all duration-300 group"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent)] group-hover:scale-110 transition-all flex-shrink-0" strokeWidth={2} />
              <span className="text-left">{link.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
