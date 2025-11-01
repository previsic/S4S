# 🔧 EmailJS Environment Variables Setup

## Kako funkcionira

Umjesto hardkodiranih ključeva u kodu, trebam da koriste `.env` file.

---

## 1️⃣ Kreiraj `.env.local` file

U root projekta (`project 12/` folder), kreiraj datoteku `.env.local`:

```bash
touch .env.local
```

---

## 2️⃣ Dodaj EmailJS ključeve

Sadržaj `.env.local`:

```
VITE_EMAILJS_PUBLIC_KEY=L5-_E3Ji2IRaMdgX3
VITE_EMAILJS_SERVICE_ID=service_pxlr01d
VITE_EMAILJS_TEMPLATE_ID=template_9c6vzkn
```

**VAŽNO:** Imena trebam počinju sa `VITE_` jer Vite samo expose varijable sa tim prefixom!

---

## 3️⃣ Koristi u ReportForm.tsx

Promijeni početak ReportForm komponente:

```typescript
// Umjesto hardkodiranih vrijednosti:
const PUBLIC_KEY = 'L5-_E3Ji2IRaMdgX3';

// Koristi environment variables:
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
```

---

## 📋 Kompletan primjer

**ReportForm.tsx - početak komponente:**

```typescript
import { useState, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export default function ReportForm() {
  // ... ostatak koda

  useEffect(() => {
    // Inicijalizacija EmailJS
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    }
  }, []);

  // ... ostatak koda
}
```

---

## 🔒 .gitignore

`.env.local` trebam biti u `.gitignore` (već je):

```
.env.local
.env
```

---

## 🚀 Build na Netlify / sum.ba

### Netlify:

1. Idi na: https://app.netlify.com/sites/cerulean-malasada-257e7f/settings/deploys#environment
2. Dodaj u "Environment variables":
   ```
   VITE_EMAILJS_PUBLIC_KEY = L5-_E3Ji2IRaMdgX3
   VITE_EMAILJS_SERVICE_ID = service_pxlr01d
   VITE_EMAILJS_TEMPLATE_ID = template_9c6vzkn
   ```

### sum.ba (nakon prebacivanja):

Postavi environment variables na web serveru:

**Apache + .htaccess:**
```apache
SetEnv VITE_EMAILJS_PUBLIC_KEY L5-_E3Ji2IRaMdgX3
SetEnv VITE_EMAILJS_SERVICE_ID service_pxlr01d
SetEnv VITE_EMAILJS_TEMPLATE_ID template_9c6vzkn
```

**Ili kao Node/Nginx:**
```bash
export VITE_EMAILJS_PUBLIC_KEY=L5-_E3Ji2IRaMdgX3
export VITE_EMAILJS_SERVICE_ID=service_pxlr01d
export VITE_EMAILJS_TEMPLATE_ID=template_9c6vzkn
npm run build
```

---

## ✅ Prednosti

- ✅ Ključevi nisu vidljivi u source kodu
- ✅ Različiti ključevi za dev, staging, production
- ✅ Sigurnije za Git repo
- ✅ Lakše za DevOps

---

## ⚠️ Važne napomene

- `VITE_` prefix je OBAVEZNO (samo tada se expose na frontend)
- `.env.local` se NE trebam commitati u Git
- Na serveru trebam postaviti kao environment variables
- Build time trebam imati dostupne varijable
