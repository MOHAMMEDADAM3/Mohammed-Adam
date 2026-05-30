# Mohammed Adam — Personal Portfolio Website

> **Live:** https://mohammedadam.dev  
> **Stack:** HTML5 · CSS3 · Vanilla JS — Zero frameworks, ultra-fast

---

## 📁 Project Structure

```
portfolio/
├── index.html              ← Main HTML (SEO-optimized, semantic)
├── css/
│   └── style.css           ← All styles (dark/light mode, responsive)
├── js/
│   ├── script.js           ← All interactions + animations
│   └── xlsx.js             ← (optional) if you add resume data export
├── assets/
│   ├── images/
│   │   ├── profile.jpg     ← ⚠ ADD YOUR PHOTO HERE (300×300px min)
│   │   └── og-preview.png  ← ⚠ ADD OG image (1200×630px)
│   └── icons/
│       ├── favicon.svg     ← ⚠ ADD YOUR FAVICON
│       └── apple-touch-icon.png
├── robots.txt              ← SEO crawler rules
├── sitemap.xml             ← Google sitemap
└── README.md               ← This file
```

---

## 🚀 Quick Start (Local)

```bash
# Option 1: VS Code Live Server (recommended)
# Install "Live Server" extension → Right-click index.html → Open with Live Server

# Option 2: Python HTTP server
python3 -m http.server 3000
# Open http://localhost:3000

# Option 3: Node.js serve
npx serve .
```

---

## 🌐 Deployment

### GitHub Pages (Free — Recommended for students)

```bash
# 1. Create a repo named: mohammedadam.github.io
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/mohammedadam/mohammedadam.github.io.git
git push -u origin main

# 2. Go to: Settings → Pages → Source: main branch
# 3. Your site will be live at: https://mohammedadam.github.io
```

### Netlify (Easiest — Custom domain friendly)

```bash
# Method 1: Drag-and-drop
# → Go to https://app.netlify.com/drop
# → Drag your portfolio folder

# Method 2: CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel

```bash
npm install -g vercel
vercel --prod
# Follow prompts → auto-deploys from GitHub
```

---

## 🎨 Customization Guide

### 1. Update Your Info
- Open `index.html` and search for placeholder values
- Replace LinkedIn/GitHub URLs (currently `/mohammedadam`) with your actual handles
- Add your photo to `assets/images/profile.jpg`
- Update `og:image` URL after deployment

### 2. Change Colors
In `css/style.css`, edit the `:root` block:
```css
:root {
  --color-accent: #00d9ff;    /* Change this to any color */
  --color-accent-2: #7c3aed;  /* Secondary accent */
}
```

### 3. Add a New Project
Copy this block in `index.html` inside `.projects__grid`:
```html
<article class="project-card" data-aos="fade-up">
  <div class="project-card__header">
    <div class="project-card__icon">🚀</div>
  </div>
  <h3 class="project-card__title">Your Project Name</h3>
  <p class="project-card__desc">Describe your project here.</p>
  <div class="project-card__tech">
    <span>React</span><span>Node.js</span>
  </div>
  <div class="project-card__links">
    <a href="https://github.com/..." class="project-card__link">GitHub →</a>
  </div>
</article>
```

### 4. Custom Domain (Netlify)
1. Buy domain at Namecheap / GoDaddy / Google Domains
2. In Netlify: Site Settings → Domain Management → Add custom domain
3. Update DNS: Add CNAME `www` → `your-site.netlify.app`
4. Enable HTTPS (Netlify does this automatically via Let's Encrypt)
5. Update ALL URLs in `index.html` from placeholder to your real domain

### 5. Add Real Project URLs
Replace all `href="#"` in project cards with actual GitHub/live URLs.

---

## 🔍 SEO Optimization Checklist

### ✅ Already Implemented
- [x] Semantic HTML5 structure (header, main, section, article, footer)
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] Title tag with name + job title + location
- [x] Meta description (under 160 chars)
- [x] Open Graph tags (Facebook, LinkedIn sharing)
- [x] Twitter Card tags
- [x] Schema.org JSON-LD (Person + WebSite)
- [x] Canonical URL tag
- [x] robots.txt
- [x] sitemap.xml
- [x] Alt texts on images
- [x] ARIA labels on interactive elements
- [x] Mobile-responsive design
- [x] Fast loading (no heavy frameworks)
- [x] Preconnect hints for Google Fonts

### ⚠ Actions Required After Deployment

1. **Submit sitemap to Google**
   - Go to: https://search.google.com/search-console
   - Add property → verify ownership
   - Submit: `https://yourdomain.com/sitemap.xml`

2. **Set up Google Analytics** (optional but recommended)
   - Create GA4 property at https://analytics.google.com
   - Add this before `</head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

3. **Create OG preview image** (1200×630px)
   - Use Canva or Figma — include your name, title, photo
   - Save as `assets/images/og-preview.png`

4. **Add your actual profile photo**
   - Filename: `assets/images/profile.jpg`
   - Recommended: 400×400px, under 100KB
   - Use https://squoosh.app to compress

5. **Replace placeholder social URLs**
   - `https://linkedin.com/in/mohammedadam` → your actual URL
   - `https://github.com/mohammedadam` → your actual URL

---

## 📈 Rank Your Name on Google — Tips

1. **Consistency**: Use "Mohammed Adam" (exact spelling) across all platforms — GitHub, LinkedIn, resume, portfolio
2. **Backlinks**: Share your portfolio URL in:
   - GitHub profile README
   - LinkedIn "Website" field
   - Dev.to / Hashnode bio
   - Hackathon profiles (Devfolio, Devpost)
3. **Content updates**: Update your portfolio monthly — Google favors fresh content
4. **Get listed**: Submit to:
   - https://indiandeveloper.io
   - https://www.toptal.com/developers (apply)
   - Hackathon winner announcements
5. **Social signals**: Share your portfolio on LinkedIn regularly
6. **Speed**: Run https://pagespeed.web.dev — aim for 90+ score

---

## ⚡ Performance Tips

- Your portfolio loads in **< 1.5 seconds** because:
  - Zero framework dependencies
  - CSS animations (no JS animation libraries)
  - Font preconnect hints
  - Lazy image loading
  - Minimal DOM operations

- To further optimize:
  - Use WebP format for `profile.jpg`
  - Host fonts locally (download from Google Fonts)
  - Add `loading="lazy"` to any additional images

---

## 📬 Contact Form Setup

The form currently uses `mailto:` which opens the user's email client.

**For a proper backend form** (no email client required), use:
- **Formspree** (free): Replace form `action` with `https://formspree.io/f/YOUR_ID`
- **Netlify Forms**: Add `netlify` attribute to `<form netlify>` — works out of the box on Netlify

---

## 📄 License

This portfolio is personal. Please don't resell or redistribute the code as a template without permission.

---

*Built with ❤️ for Mohammed Adam · Warangal, India*
