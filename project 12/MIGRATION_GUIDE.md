# 📋 UPUTSTVO ZA PREBACIVANJE NA SUM.BA

## 🎯 Za developera (tpapac)

---

## 📧 EMAILJS KLJUČEVI - KOPIRATI DIREKTNO

```
PUBLIC_KEY:   L5-_E3Ji2IRaMdgX3
SERVICE_ID:   service_pxlr01d
TEMPLATE_ID:  template_9c6vzkn
```

**Gdje se trebam koristiti:**
- Trebam u ReportForm.tsx ili u environment variables
- Trebam u build procesu

---

## 🔧 Korak 1: Instalacija

```bash
cd /path/to/scan4support
npm install
```

---

## 🏗 Korak 2: Build

```bash
npm run build
```

Output će biti u `dist/` foldera - **OVO TREBAM SERVIRATI**

---

## 🌐 Korak 3: Web Server Setup

### Apache (.htaccess)

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
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## 📧 Korak 4: EmailJS Setup

### Opcija 1: Zadržati EmailJS (jednostavno)

Koristiti iste ključeve kao sada:
```
PUBLIC_KEY:   L5-_E3Ji2IRaMdgX3
SERVICE_ID:   service_pxlr01d
TEMPLATE_ID:  template_9c6vzkn
```

Trebam znati: **Na koji email ide mail sada?**

### Opcija 2: Kreirati backend (sigurnije)

Trebam Node/PHP backend koji:
1. Prima POST zahtjev sa forme
2. Provjerava podatke
3. Koristi EmailJS na serveru (ne u pregledniku)
4. Šalje na `scan4support@sum.ba`
5. Loguje u bazu

---

## 🚀 Final Setup

```
scan4support.sum.ba/
├── index.html
├── assets/
│   ├── index-XXXX.js      (React app - minificiran)
│   └── index-XXXX.css
├── Group 469.png
├── Group 473.png
└── ... (sve datoteke iz dist/)
```

---

## ✅ Provjera da radi

1. Otviram https://scan4support.sum.ba
2. Vidim formu
3. Popunim formu
4. Kliknem "Pošalji"
5. Trebam vidjeti success poruku
6. Email trebam da stigne na odgovarajuću adresu

---

## ❓ PITANJA

- Gdje trebam da ide email sa upitima?
- Trebam li logovanje upita?
- Trebam li backend?
- Koji je domain?

**Kontakt:** Marijan Tustonja <marijan.tustonja@sum.ba>
