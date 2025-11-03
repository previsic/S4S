# Scan4Support - Deployment Upute

## 📋 Tehnički Zahtjevi

### Node.js & npm
- **Node.js:** v18.x ili noviji (testirano na v22.17.0)
- **npm:** v9.x ili noviji (testirano na v10.9.2)

### Frontend Stack
- **React:** 18.3.1
- **TypeScript:** 5.5.3
- **Vite:** 5.4.2 (build tool)
- **Tailwind CSS:** 3.4.1

---

## 🚀 Instalacija na sum.ba

### 1. Instalacija Dependencies

```bash
cd /path/to/project
npm install
```

### 2. Environment Variables

Kreiraj `.env.local` file ili postavi environment varijable na serveru:

```bash
VITE_EMAILJS_PUBLIC_KEY=L5-_E3Ji2IRaMdgX3
VITE_EMAILJS_SERVICE_ID=service_nfg20ut
VITE_EMAILJS_TEMPLATE_ID=template_un44etj
```

**Napomena:** Ove vrijednosti su već postavljene kao fallback u kodu, ali preporučeno je koristiti environment varijable.

### 3. Build za Produkciju

```bash
npm run build
```

Ova komanda kreira `dist/` folder s optimiziranim production build-om.

### 4. Deploy

Sve iz `dist/` foldera trebam biti serviran kao statičke datoteke.

**Struktura:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── [slike i ostali assets]
```

---

## ⚙️ Web Server Konfiguracija

### Apache (.htaccess)

Postavi `.htaccess` u `dist/` folderu:

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

### Nginx

```nginx
server {
    listen 80;
    server_name scan4support.sum.ba;
    root /var/www/scan4support/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caching za assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 📧 EmailJS Konfiguracija

Aplikacija koristi EmailJS za slanje email notifikacija.

### Trenutna Konfiguracija:
- **Service:** service_nfg20ut (Gmail: scan4support@sum.ba)
- **Template:** template_un44etj
- **Public Key:** L5-_E3Ji2IRaMdgX3

### Gdje idu mailovi?

EmailJS je konfiguriran da šalje mailove na:
**scan4support@sum.ba**

### Provjera:
- EmailJS Dashboard: https://dashboard.emailjs.com/admin
- Service: https://dashboard.emailjs.com/admin/services/service_nfg20ut
- Template: https://dashboard.emailjs.com/admin/templates/template_un44etj

---

## 🔄 Deployment Workflow

### Opcija 1: Manualni Deploy

```bash
# 1. Pull najnoviji kod
git pull origin main

# 2. Install/update dependencies
npm install

# 3. Build
npm run build

# 4. Copy dist/ folder na server
rsync -av dist/ /var/www/scan4support/
```

### Opcija 2: Automatski Deploy (CI/CD)

Projekt je kompatibilan s:
- GitHub Actions
- Netlify (trenutno live: https://scan4support.netlify.app)
- Vercel
- GitLab CI

---

## 📁 Struktura Projekta

```
project 12/
├── src/
│   ├── components/        # React komponente
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ReportForm.tsx  # Glavna forma
│   │   ├── LinkCards.tsx
│   │   ├── Partners.tsx
│   │   └── Footer.tsx
│   ├── context/
│   │   └── LanguageContext.tsx  # HR/EN switch
│   ├── types/
│   │   └── translations.ts      # Svi prijevodi
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                # Statički assets (slike, logoi)
├── dist/                  # Build output (deploy ovo!)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

---

## 🧪 Testiranje

```bash
# Development server
npm run dev
# → http://localhost:5173

# Type checking
npm run typecheck

# Linting
npm run lint

# Production preview
npm run build
npm run preview
# → http://localhost:4173
```

---

## 🌐 Domain & SSL

### Za scan4support.sum.ba:

1. **DNS A Record:**
   ```
   scan4support.sum.ba → [IP sum.ba servera]
   ```

2. **SSL Certifikat:**
   ```bash
   # Certbot (Let's Encrypt)
   sudo certbot --nginx -d scan4support.sum.ba
   ```

---

## 🐛 Troubleshooting

### Problem: Bijela stranica nakon deploya

**Rješenje:** Provjeri base path u `vite.config.ts`
- Za root domain: `base: '/'`
- Za subdirektorij: `base: '/scan4support/'`

### Problem: 404 na refresh

**Rješenje:** SPA routing nije konfiguriran. Vidi "Web Server Konfiguracija" gore.

### Problem: EmailJS ne šalje mailove

**Provjeri:**
1. Internet konekcija na serveru
2. EmailJS ključevi u environment varijablama
3. EmailJS dashboard - je li service aktivan
4. Browser console za error poruke

---

## 📊 Performance

**Build statistika:**
```
HTML:   1.93 kB  (gzip: 0.81 kB)
CSS:   22.53 kB  (gzip: 5.47 kB)
JS:   180.59 kB  (gzip: 56.65 kB)
Total:  ~61 kB   (gzipped)
```

**Lighthouse Score:** 95+ (Performance, Accessibility, SEO)

---

## 👥 Kontakt

- **Developer:** Juraj Previšić (FSRE)
- **GitHub:** https://github.com/previsic/S4S
- **Live Demo:** https://scan4support.netlify.app

---

## 📝 Licenca

EU Peace Project @ Sveučilište u Mostaru


