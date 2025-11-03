# Scan4Support - Studentska Platforma za Podršku

## 🎯 Što je ovo?

Scan4Support je **React + TypeScript aplikacija** za primanje upita od studenata Sveučilišta u Mostaru.

- **Autori:** Juraj Previšić (FSRE) i Ivan Galić (FPMOZ)
- **Projekt:** EU Peace
- **Trenutni URL:** https://cerulean-malasada-257e7f.netlify.app

---

## 🛠 Tehnologija

```
Frontend:
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- Tailwind CSS 3.4.1
- Lucide React (ikonice)
- EmailJS (slanje emaila)

Language Support:
- Hrvatski (hr)
- Engleski (en)
```

---

## 📦 Installation & Development

```bash
# Instalacija dependencija
npm install

# Lokalni development server
npm run dev
# → http://localhost:5175

# Build za produkciju
npm run build

# Linting
npm lint

# Type checking
npm run typecheck
```

---

## 📧 EmailJS Integracija

### Ključevi za EmailJS:

```
PUBLIC_KEY:   L5-_E3Ji2IRaMdgX3
SERVICE_ID:   service_pxlr01d
TEMPLATE_ID:  template_9c6vzkn
```

**Gdje se koriste:**
- `src/components/ReportForm.tsx` - slanje upita
- Ključevi su hardkodirani u dist build-u

### Email tokovi:

1. **Student popuni formu** → ReportForm.tsx
2. **Forma se pošalje** → EmailJS API
3. **EmailJS pošalje mail** → Primatelja (trebam znati koji email!)

---

## 🚀 Prebacivanje na sum.ba

### Trebam da se kopira:

```
src/              - Sav TypeScript kod
public/           - Slike i assets
package.json      - Dependencije
vite.config.ts    - Vite konfiguracija
tsconfig.json     - TypeScript konfiguracija
index.html        - HTML template
```

### Build output:

```bash
npm run build
# → Sve ide u ./dist/ folder
```

### Setup na sum.ba:

1. **Node.js verzija:** 18+ (preferably 20+)
2. **npm verzija:** 9+
3. **Build process:** `npm install && npm run build`
4. **Serve:** Svim datotekama iz `dist/` kao static files
5. **Routing:** Svi path-evi trebam da ide na `index.html` (SPA)

---

## 📋 Datotečna struktura

```
project 12/
├── src/
│   ├── components/
│   │   ├── Header.tsx        - Navigacija + Logo
│   │   ├── Hero.tsx          - Typewriter animacija
│   │   ├── ReportForm.tsx    - GLAVNA FORMA
│   │   ├── LinkCards.tsx     - Linkovi na pomoć
│   │   ├── Partners.tsx      - Logotipи partnera
│   │   └── Footer.tsx        - Footer
│   ├── context/
│   │   └── LanguageContext.tsx - HR/EN switch
│   ├── types/
│   │   └── translations.ts   - Sve prijevode
│   ├── App.tsx               - Main komponenta
│   ├── main.tsx              - Entry point
│   └── index.css             - Tailwind + Custom CSS
├── public/                   - Slike i assets
├── dist/                     - Build output (SERVE OVO)
├── package.json              - Dependencije
├── vite.config.ts            - Vite config
├── tsconfig.json             - TypeScript config
└── netlify.toml              - Netlify config (može se izbrisati)
```

---

## 🔐 Sigurnost - VAŽNO!

⚠️ **EmailJS ključevi su vidljivi u kodu!**

Za produkciju na sum.ba trebam:
- Option 1: Zadržati iste ključeve (jednostavno)
- Option 2: Kreiriti backend koji drži ključeve u sigurnosti

---

## 🌍 Lokalizacija

### Jezici:
- `hr` - Hrvatski
- `en` - Engleski

### Gdje su prijevodi:
- `src/types/translations.ts` - Svi stringovi
- `src/context/LanguageContext.tsx` - Language switcher

---

## 📝 Što trebam znati za sum.ba

1. **Gdje trebam da ide email sa upitima?**
   - `scan4support@sum.ba`?
   - Ili neka druga adresa?

2. **Trebam li backend na sum.ba?**
   - Database za logovanje?
   - Email routing po kategoriji?

3. **Domain:**
   - `scan4support.sum.ba`?
   - Ili drugi?

---

## 🐛 Debugging

```bash
# Dev server sa source maps
npm run dev

# Build sa detaljnim error messageima
npm run build

# TypeScript type checking
npm run typecheck
```

Browser DevTools:
- F12 za Console
- Provjeri Network tab za EmailJS pozive
- Provjeri Application tab za localStorage

---

## 📞 Kontakt

- **Juraj Previšić** - Razvoj (FSRE)
- **Ivan Galić** - Razvoj (FPMOZ)

---

## 📄 Licenca

EU Peace Project @ Sveučilište u Mostaru
