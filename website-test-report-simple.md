# Staffton Website — Simple Test Report

**Date:** 7 September 2026  
**Kya test hua:** Local website (`http://127.0.0.1:3000`) + Live website (`https://stafftonhealth.com`)  
**Total problems:** 14 (10 bahut serious, 4 medium)

Yeh report simple language mein hai. Technical details ke liye alag OpenTestAI files hain.

---

## 2 minute mein samajh lo

Aapka **laptop wala naya website** theek chal raha hai.  
**Live website (stafftonhealth.com)** abhi **purana version** hai — August 2026 ka.

Isliye:

1. Naye pages live pe **nahi khulte** (404 error).
2. Purane links **sahi naye page pe nahi bhejte**.
3. Kuch buttons **galat jagah** le jaate hain (Login / Sign Up).
4. Security mein ek **HTTP jump** ho raha hai (safe nahi).

**Sabse pehle yeh 3 kaam karo:**

1. Naya website **live pe deploy** karo.
2. Purane URLs ko **naye URLs pe redirect** karo (301).
3. HTTPS ko **HTTP pe mat bhejo**.

---

## Simple words

| Word | Matlab |
|---|---|
| **Local** | Aapke computer pe chal raha naya site |
| **Live / Production** | Jo duniya dekh rahi hai: stafftonhealth.com |
| **404** | Page nahi mila — “yeh page exist nahi karta” |
| **301 redirect** | Purana link automatically naye page pe chala jaye (Google bhi samajhta hai) |
| **HTTPS** | Safe lock wala http (**https://**) |
| **HTTP** | Bina lock (**http://**) — data chori ho sakta hai |

---

## Part 1 — Redirect / links (sabse important)

Socho: user Google se, email se, ya old bookmark se aata hai.  
Agar purana link **404** de, toh woh band ho jata hai.  
Sahi tarika: purana link **apne aap** naye page pe chala jaye.

### Live site pe kya hua

| User yeh URL kholta hai | Kya hona chahiye | Ab kya ho raha hai |
|---|---|---|
| `/best-medical-staffing-companies` (Hire Talent naya page) | Naya hospital page dikhe | **404 — page nahi mila** |
| `/nurse-doctor-jobs-india` (Jobs naya page) | Naya jobs page dikhe | **404** |
| `/jobs/in/pune` (Pune jobs) | Pune jobs dikhe | **404** |
| `/hire-talent` (purana naam) | Naye Hire Talent page pe bhejo | **404** |
| `/for-hospitals/` (purana hospital page) | Naye Hire Talent page pe bhejo | **Purana page abhi bhi khul raha hai** (redirect nahi) |
| `/for-professionals/` (purana jobs page) | Naye jobs page pe bhejo | **Purana page abhi bhi khul raha hai** |
| `/about` ya `/contact` | `/about-us` aur `/contact-us` pe bhejo | **404** |

**Seedha matlab:**  
Live pe naya website **gaya hi nahi**. Google / ads / purane links toot rahe hain.

### Local (naya code) pe kya hua

Naye pages local pe **sahi khulte hain**.  
Lekin purane names (`/hire-talent`, `/for-hospitals`, `/about`) **404** dete hain.

Redirect rules file mein likhe hain (`_redirects`, `staticwebapp.config.json`), lekin Next.js / Vercel **unhe padhta nahi**.  
Asli jagah: `next.config.ts` — wahan abhi **koi redirect nahi**.

Ek aur galti: purani rule `/about` ko `/about/` bhejti hai.  
Sahi page hai **`/about-us`**, `/about/` nahi.

---

## Part 2 — Security (lock toot raha hai)

### Problem

Jab koi `https://stafftonhealth.com/about-us` (bina last slash) kholta hai:

1. Site pehle **`http://`** (bina lock) pe bhejti hai  
2. Phir wapas **`https://`** pe aati hai

Yeh **do kadam** hain, aur beech wala kadam **unsafe** hai.

**Simple example:**  
Ghar ke locked darwaze se nikal ke, beech mein open gali se jaake, phir locked darwaze se andar. Koi beech mein dekh / badal sakta hai.

Yahi `/contact-us`, `/privacy-policy` pe bhi ho raha hai.

### Extra

Live site pe security headers nahi hain (HSTS wagairah).  
Matlab browser ko clearly nahi pata “hamesha lock use karo”.

---

## Part 3 — Login / Sign Up buttons galat

### Homepage

- **Login** likha hai, lekin user **Register / Sign Up** page pe jaata hai.
- **Sign Up** app ke **home** pe jaata hai, seedha signup form pe nahi.

User sochta hai “main login karunga”, lekin naya account banana padta hai. Confusing + customers toot sakte hain.

### Baaki pages (Jobs, About, Contact, etc.)

Wahan Login / Sign Up **staging / test server** pe jaate hain:

`d3gifdjcbs2hsb.cloudfront.net`

Homepage **sahi production app** pe jaata hai:

`app.stafftonhealth.com`

**Matlab:** same website ke do buttons do alag duniya mein le jaate hain.  
Pune jobs page se login karoge toh **test app** khul sakta hai, asli app nahi.

---

## Part 4 — Slash `/` wala confusion (SEO)

Do tarike hote hain:

- `stafftonhealth.com/about-us/`  (slash ke saath)
- `stafftonhealth.com/about-us`   (slash ke bina)

**Live site** bolti hai: slash **ke saath** sahi hai.  
**Naya Next.js** bolta hai: slash **ke bina** sahi hai.

Sitemap aur links slash ke saath likhe hain, lekin naya code unhe hata deta hai.

**Agar aisa hi deploy kiya** toh Google confuse hoga: kaunsa URL asli hai? Ranking split ho sakti hai.

**Faisla lo ek hi style,** dono jagah same rakho.

---

## Part 5 — Pune jobs page ulta dikh raha hai

`/jobs/in/pune` pe:

- Filter kehti hai: **52 jobs** hain (17 + 25 + 10)
- Beech mein likha hai: **“No job openings match your criteria”**
- Applied filters: **0** (matlab user ne filter nahi lagaya)

Dono saath mein sahi nahi ho sakte.  
Doctor / nurse sochegne “Pune mein job nahi hai” aur nikal jaayenge.

---

## Part 6 — Contact form

- Fields **required** nahi dikhte (star `*` nahi).
- Screen reader ko pata nahi kaunsa box zaroori hai.
- Form default **GET** hai. Agar JavaScript fail ho, naam/email **URL mein** aa sakte hain (unsafe + ugly).

Phone number `tel:9111101377` hai — **+91 nahi**.  
Bahar ke phone / kuch browsers galat number dial karenge. `911` emergency jaisa bhi lagta hai.

---

## Part 7 — Chhote lekin real problems

### Cookie / privacy

Cookie policy kehti hai: “pehle permission, phir tracking.”  
Google Tag Manager **permission se pehle** load ho raha hai.  
Footer mein **Cookie Policy** link nahi hai — sirf Terms + Privacy.

### Blog cards

Menu ka **Blogs** Staffton blog pe jaata hai.  
Homepage ke article cards **hirium.com** pe jaate hain (dusri company).  
Traffic nikal jaata hai, branding confuse hoti hai.

### Logo (accessibility)

Upar wala Staffton logo screen reader ko **naam nahi** deta.  
Neeche footer logo sahi hai (“Staffton home”). Header ko bhi waisa hi banao.

---

## Priority — pehle kya fix karo

### Aaj / is hafte (bahut zaroori)

1. **Naya site live pe daalo** — warna naye SEO pages 404 hi rahenge.
2. **Redirects `next.config.ts` mein likho:**
   - `/hire-talent` + `/for-hospitals` → `/best-medical-staffing-companies`
   - `/for-professionals` → `/nurse-doctor-jobs-india`
   - `/about` → `/about-us`
   - `/contact` → `/contact-us`
3. **HTTPS → HTTP jump band karo** (nginx / server).
4. **Login / Sign Up URLs theek karo** (homepage + inner pages, production app).

### Uske baad

5. Slash rule ek hi rakho (local = live).
6. Pune jobs list vs filter count theek karo.
7. Contact form: required + POST + `+91` phone.
8. GTM consent ke baad load karo; footer mein Cookie Policy.
9. Blog cards Staffton blog pe, logo pe aria-label.

---

## Short answers (agar koi poochhe)

**Q: Live site kharab hai kya?**  
Haan, naye pages live pe nahi hain. Purana site chal raha hai.

**Q: Local theek hai?**  
Haan, naye pages local pe khulte hain. Purane URLs local pe bhi 404 hain kyunki redirect Next mein set nahi hai.

**Q: Google pe asar?**  
Haan. 404 + galat redirect + slash confusion = ranking / traffic loss.

**Q: Users ko kya dikkat?**  
Hire/Jobs links tootna, Login galat jagah, Pune pe “no jobs”, contact phone galat.

---

## Files

- Yeh simple report: `website-test-report-simple.md`
- Full technical report: `opentestai-report-stafftonhealth-com-2026-09-07T11-48.md`
- Same data JSON/HTML mein bhi hai.

Agar chaho toh next step mein **sirf redirects + login URLs** code mein fix kar sakte hain.
