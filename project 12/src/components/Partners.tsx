import { useLanguage } from '../context/LanguageContext';

export default function Partners() {
  const { language } = useLanguage();

  const partnersRow1 = [
    { name: 'University of Mostar', logo: '/P9-SUM_logo_en.png', size: 'h-16 sm:h-16 md:h-20' },
    { name: 'Zaklada SUM', logo: '/Zaklada-SUM_logotip.png', size: 'h-20 sm:h-18 md:h-24', hideOnMobile: true },
  ];

  const partnersRow2 = [
    { name: 'Zaklada SUM', logo: '/Zaklada-SUM_logotip.png', size: 'h-20 sm:h-18 md:h-24', hideOnDesktop: true },
    { name: 'UZSS', logo: '/Untitled design (13).png', size: 'h-28 sm:h-32 md:h-36' },
    { name: 'Savjet', logo: '/savjet.png', size: 'h-20 sm:h-18 md:h-24' },
  ];

  const partnersRow3 = [
    { name: 'EUPeace', logo: '/LOGO i Co-funded_0 - Edited.png', size: 'h-24 sm:h-28 md:h-32' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-6 sm:mb-8 text-center">
        {language === 'hr' ? 'Partneri i sponzori' : 'Partners and Sponsors'}
      </h2>

      <div className="glass-card rounded-2xl p-4 sm:p-5 md:p-6">
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-wrap gap-6 sm:gap-12 items-center justify-center w-full">
            {partnersRow1.map((partner) => (
              <div
                key={partner.name}
                className={`logo-grayscale ${partner.hideOnMobile ? 'hidden md:block' : ''}`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`${partner.size} w-auto object-contain`}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 sm:gap-12 items-center justify-center w-full">
            {partnersRow2.map((partner) => (
              <div
                key={partner.name}
                className={`logo-grayscale ${partner.hideOnDesktop ? 'block md:hidden' : ''}`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`${partner.size} w-auto object-contain`}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 sm:gap-12 items-center justify-center w-full">
            {partnersRow3.map((partner) => (
              <div
                key={partner.name}
                className="logo-grayscale"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`${partner.size} w-auto object-contain`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
