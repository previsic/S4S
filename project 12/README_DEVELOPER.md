# Scan4Support - Informacije za Developera (tpapac)

## 📦 Quick Info

**Projekt:** Scan4Support - Studentska platforma za podršku  
**GitHub:** https://github.com/previsic/S4S  
**Live Demo:** https://s4s-xxx.vercel.app  
**Developer:** Juraj Previšić (FSRE)  
**Target Server:** sum.ba

---

## 🚀 Instalacija na sum.ba - 3 Koraka

### 1️⃣ Clone Repository

```bash
cd /var/www/
git clone https://github.com/previsic/S4S.git scan4support
cd scan4support/project\ 12
```

### 2️⃣ Install & Build

```bash
npm install
npm run build
```

**Output:** `dist/` folder (sve spremno za deploy)

### 3️⃣ Web Server Config

**Apache (.htaccess u dist/ folderu):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
server {
    listen 80;
    server_name scan4support.sum.ba;
    root /var/www/scan4support/project\ 12/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 📋 Tehnički Zahtjevi

### Minimalno:
- **Node.js:** v18.x ili noviji
- **npm:** v9.x ili noviji
- **Disk Space:** ~50MB (dependencies + build)
- **Memory:** 512MB RAM za build

### Testirano na:
- **Node.js:** v22.17.0
- **npm:** v10.9.2

---

## 📧 EmailJS Konfiguracija

### Ključevi (već u kodu):
```javascript
PUBLIC_KEY:   L5-_E3Ji2IRaMdgX3
SERVICE_ID:   service_nfg20ut
TEMPLATE_ID:  template_un44etj
```

### Email flow:
```
Korisnik popuni formu → 
EmailJS API (Gmail: scan4support@sum.ba) → 
Email stiže na: scan4support@sum.ba
```

**⚠️ VAŽNO:** EmailJS zahtijeva internet konekciju!

### Environment Variables (opciono):

Ako želiš koristiti različite ključeve za produkciju:

```bash
# Kreiraj .env.local
VITE_EMAILJS_PUBLIC_KEY=L5-_E3Ji2IRaMdgX3
VITE_EMAILJS_SERVICE_ID=service_nfg20ut
VITE_EMAILJS_TEMPLATE_ID=template_un44etj
```

---

## 🌐 Domain Setup

### DNS:
```
scan4support.sum.ba → A Record → [IP sum.ba servera]
```

### SSL (Let's Encrypt):
```bash
sudo certbot --nginx -d scan4support.sum.ba
# ili za Apache:
sudo certbot --apache -d scan4support.sum.ba
```

---

## 📁 Struktura Projekta

```
S4S/
├── netlify.toml           # Netlify config (može se ignorirati)
├── vercel.json            # Vercel config (može se ignorirati)
└── project 12/            ← GLAVNI PROJEKT
    ├── src/               # Source kod
    ├── public/            # Statički assets
    ├── dist/              # Build output (DEPLOY OVO!)
    ├── package.json       # Dependencies
    ├── vite.config.ts     # Vite konfiguracija
    └── DEPLOYMENT.md      # Detaljne upute
```

**⚠️ Projekt se nalazi u `project 12/` folderu!**

---

## 🧪 Lokalno Testiranje

```bash
cd "project 12"

# Development
npm run dev
# → http://localhost:5173

# Build
npm run build

# Preview produkcijskog build-a
npm run preview
# → http://localhost:4173
```

---

## 🔄 Update Procedure (buduće izmjene)

```bash
cd /var/www/scan4support
git pull origin main
cd "project 12"
npm install  # Ako ima novih dependencies
npm run build
# dist/ folder je ažuriran
```

---

## 📊 Build Info

**Veličina:**
```
HTML:   ~2 kB
CSS:    ~23 kB (5.5 kB gzipped)
JS:     ~180 kB (57 kB gzipped)
Assets: ~700 kB (slike)
Total:  ~900 kB
```

**Build vrijeme:** ~1-2 sekunde

---

## 🐛 Troubleshooting

### Problem: Bijela stranica

**Uzrok:** Base path nije dobro konfiguriran

**Rješenje:**
```javascript
// vite.config.ts
base: '/'  // Za root domain
// ili
base: '/scan4support/'  // Za subdirektorij
```

### Problem: 404 na refresh

**Uzrok:** SPA routing nije konfiguriran

**Rješenje:** Vidi "Web Server Config" gore

### Problem: EmailJS ne šalje mailove

**Provjeri:**
1. Internet konekcija
2. Browser Console (F12) za error poruke
3. EmailJS Dashboard - je li service aktivan?
4. Spam folder u scan4support@sum.ba

---

## 📞 Kontakt

**Pitanja oko deploymen**ta:
- **Developer:** Juraj Previšić
- **Email:** juraj.previsic1@fsre.sum.ba
- **GitHub:** https://github.com/previsic/S4S

**Pitanja oko maila:**
- **Email:** scan4support@sum.ba

---

## ✅ Deployment Checklist

Pre-deployment:
- [ ] Node.js 18+ instaliran
- [ ] Git pristup sum.ba serveru
- [ ] scan4support@sum.ba mail aktivan
- [ ] DNS za scan4support.sum.ba konfiguriran

Deployment:
- [ ] Repository clonan
- [ ] npm install završen
- [ ] npm run build uspješan
- [ ] dist/ folder serviran
- [ ] Web server routing konfiguriran
- [ ] SSL certifikat instaliran

Post-deployment:
- [ ] Stranica se učitava (https://scan4support.sum.ba)
- [ ] Forma funkcionira
- [ ] Email stiže na scan4support@sum.ba
- [ ] Responsive dizajn OK (mobile, tablet, desktop)
- [ ] Oba jezika rade (HR/EN)

---

**Datum kreiranja:** 3. studeni 2025  
**Status:** ✅ Production Ready  
**Verzija:** 1.0

