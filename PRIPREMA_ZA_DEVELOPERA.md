# 🚀 SCAN4SUPPORT - PRIPREMA ZA PREBACIVANJE NA SUM.BA

## 📦 ŠTO JE SPREMNO

Sve što trebam developeru (tpapac) je spremno u:
- **ZIP datoteka:** `scan4support-source.zip` (1.7MB)
- **Lokacija:** `/Users/juraj/PROJEKTEUPEACE/S4S/scan4support-source.zip`

---

## 📋 SADRŽAJ ZIP-A

```
scan4support-source/
├── README.md                 ← Pročitaj PRVO
├── MIGRATION_GUIDE.md        ← Upute za prebacivanje
├── package.json              ← Dependencije
├── src/                      ← Sav kod
│   ├── components/
│   ├── context/
│   ├── types/
│   └── ...
├── public/                   ← Slike i assets
├── vite.config.ts
├── tsconfig.json
└── ... (sve datoteke)
```

---

## 🔑 EMAILJS KLJUČEVI - VAŽNO!

Ovi ključevi su **već hardkodirani u aplikaciji** i trebam da se prebace na sum.ba:

```
📧 PUBLIC_KEY:   L5-_E3Ji2IRaMdgX3
📧 SERVICE_ID:   service_pxlr01d
📧 TEMPLATE_ID:  template_9c6vzkn
```

**Gdje se trebam koristiti:**
- U `src/components/ReportForm.tsx` - slanje upita
- Trebam da rade na sum.ba bez promjena

---

## ⚡ QUICK START ZA DEVELOPERA

```bash
# 1. Raspakuj zip
unzip scan4support-source.zip

# 2. Instalacija
npm install

# 3. Provjera lokalno
npm run dev
# → http://localhost:5175

# 4. Build za produkciju
npm run build

# 5. Deploy na sum.ba - prenesi sve iz ./dist/ foldera
```

---

## 🌐 TEHNOLOŠKI ZAHTJEVI

```
Node.js:    18+ (preferably 20+)
npm:        9+
Web server: Apache / Nginx / IIS
```

---

## 📧 EMAIL INTEGRACIJA

### SADA:
- Frontend forma šalje direktno na EmailJS
- EmailJS šalje mail na... (trebam znati gdje!)

### NA SUM.BA - DVE OPCIJE:

**Opcija 1: Jednostavno (samo prebaci aplikaciju)**
- Koristi iste EmailJS ključeve
- Mail ide tamo gdje ide sada

**Opcija 2: Sigurnije (trebam backend)**
- Backend API na sum.ba
- Backend šalje na `scan4support@sum.ba`
- Logira upite u bazu

---

## 🎯 KORACI ZA PREBACIVANJE

### 1️⃣ **Preuzmi ZIP**
```
scan4support-source.zip
```

### 2️⃣ **Postavi na sum.ba server**
- Raspakuj na `/var/www/scan4support` ili slično
- `npm install`
- `npm run build`

### 3️⃣ **Konfiguraj web server**

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 4️⃣ **Servira iz `dist/` foldera**
```
scan4support.sum.ba/
├── index.html
├── assets/ (JS i CSS)
└── public/ (slike)
```

### 5️⃣ **Provjeri da radi**
- https://scan4support.sum.ba
- Popuni formu
- Provjeri email

---

## ❓ PITANJA KOJA TREBAM ODGOVORE

Trebam da **provjeriš sa Marijanom ili Tomaslavljem:**

1. **Gdje trebam da ide email sa upitima?**
   - Na scan4support@sum.ba?
   - Na neku drugu adresu?

2. **Trebam li logovanje upita?**
   - U bazi podataka?
   - Log file?

3. **Trebam li backend API?**
   - Ili samo prebaci frontend kako je?

4. **Koji je domain?**
   - scan4support.sum.ba?
   - Drugi?

---

## 📞 KONTAKT

- **Project Manager:** Marijan Tustonja <marijan.tustonja@sum.ba>
- **Developer:** tpapac
- **Juraj Previšić** - Original developer

---

## ✅ CHECKLIST ZA DEVELOPERA

- [ ] Preuzmi ZIP datoteku
- [ ] Raspakovaj i instaliraj (`npm install`)
- [ ] Provjeri lokalno (`npm run dev`)
- [ ] Build (`npm run build`)
- [ ] Prebaci `dist/` folder na sum.ba
- [ ] Konfiguraj web server za SPA routing
- [ ] Provjeri da radi https://scan4support.sum.ba
- [ ] Provjeri email slanje
- [ ] Objavi Marijanu da je gotovo

---

## 🔒 Sigurnosne napomene

⚠️ **EmailJS ključevi su vidljivi u kodu!**
- Public Key je OK da je vidljiv
- Trebam provjeriti Restrictions u EmailJS account-u

---

**Priprema završena: 2025-10-30 16:21**
