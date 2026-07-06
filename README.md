# Portfolio Website

A complete, responsive, modern portfolio website built with plain HTML, CSS and JavaScript. Ready to deploy on Netlify.

Features
- Hero section with CTA
- About section
- Skills with progress bars
- Projects grid with modal details
- Contact form (Netlify Forms-ready)
- Responsive layout for mobile/tablet/desktop
- Smooth reveal animations and micro-interactions
- All styles in `style.css` and JS in `script.js`

Files
- `index.html` — main page (in project root)
- `style.css` — all styling and animations
- `script.js` — interactive behavior
- `README.md` — this file

Setup & Local preview
1. Clone or copy files into a folder.
2. To preview locally, simply open `index.html` in a browser. For a local dev server:
   - Use VS Code Live Server extension or
   - Python 3: `python -m http.server 8000` then visit `http://localhost:8000`

Netlify deployment (recommended)
1. Create a new site on Netlify and connect your Git repository, or drag & drop the folder in Netlify's UI.
2. If using Netlify Forms: ensure the `form` in `index.html` is present (it is), which contains `data-netlify="true"` and a `form-name` hidden input — Netlify will detect it automatically.
3. No build command is required for this plain HTML site. Deploy directory: the repo root (where `index.html` lives).

Customization
- Replace placeholder text, links, and images.
- Update social profile links in the Contact section.
- For live project pages, update the `data-link` attributes on project cards or the anchor `.link`.

Accessibility & Notes
- Semantic HTML and ARIA attributes are used for navigation and modal.
- The contact form uses Netlify Forms attributes which allow serverless form submissions without a backend.
- Images are placeholders; replace them with optimized images for production.

If you want, I can:
- Convert Projects into a JSON-driven list and generate cards dynamically.
- Add a theme (light/dark) toggle and persist preference.
- Integrate real analytics or contact form handling.

Enjoy — drop these files into a repository and deploy to Netlify for a working portfolio site.
