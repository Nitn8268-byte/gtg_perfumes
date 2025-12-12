```markdown
# GTG Perfumes — Landing Page

A pixel-perfect implementation of the GTG Perfumes marketing page based on the provided Figma design. Built with plain HTML, CSS and JavaScript and optimized for desktop, tablet and mobile viewports.

## Preview

- Live demo: https://nitn8268.github.io/gtg_perfumes  
- Design reference: Figma assignment file (Cube)

## Features

### Layout & Responsiveness
- Six distinct sections matching the design frame‑by‑frame:
  - Hero with full‑bleed sky/grass background and bottle image
  - GTG Perfumes product block with gallery and subscription options
  - “Our Collection” accordion with supporting image
  - Story/promo section with side image
  - Animated stats strip (84%, 78%, 89%, 90%)
  - Comparison table (“Why GTG is the #1 Choice”) and footer with newsletter
- Fully responsive layout using CSS Grid and Flexbox
- Navigation adapts to smaller screens with a hamburger menu

### Interactions
- Product image gallery
  - Main image with previous/next arrows
  - Dots and thumbnails keep the gallery in sync
- Subscription options
  - Independent dropdown panels for Single and Double subscriptions
  - “Choose a Fragrance” tiles act as radio buttons
  - “What’s included” tabs switch between monthly and one‑time views
  - “Add to Cart” link updates based on fragrance, plan and included option
- Our Collection
  - Accordion with only one card open at a time
- Stats
  - Percentages count up from 0 when the stats strip scrolls into view
- Comparison table
  - GTG column highlighted with a light green background
  - Semantic HTML `<table>` used for accessibility

## Tech Stack
- HTML5 – semantic structure
- CSS3 – custom layout and styling, no frameworks
- JavaScript (ES6) – gallery, accordions, subscriptions, counters and nav interactions
- No UI libraries or front‑end frameworks used

## Project Structure
```
/project-root
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── hero-full.png
    ├── img (1).png
    ├── img (2).png
    ├── img (3).png
    ├── img (4).png
    ├── img (5).png
    ├── img (6).png
    ├── img (7).png
    ├── img (8).png
    ├── img (9).png
    ├── img (10).png
    ├── img (11).png
    ├── img (13).png
    ├── gtg-col.png
    ├── arose-col.png
    ├── bella-col.png
    └── daisies-col.png
```

## Getting Started

Clone the repository and open the site locally:

```bash
git clone https://github.com/Nitn8268-byte/gtg.git
cd gtg
```

Open `index.html` directly in your browser, or serve it with a simple static server, for example:

```bash
npx serve .
```

View the page at:
- Desktop (≈1440px) to compare with the Figma design
- Tablet and mobile sizes using your browser dev tools

## Implementation Notes
- Fonts, colors, spacings and radii are taken from the Figma file as closely as possible.
- Layout is mobile-aware but optimized for the desktop design first, then adapted with media queries.
- Image files are exported from Figma and lightly optimized for the web.
- JavaScript is organized into small, focused components:
  - Navigation toggle
  - Image carousel
  - Subscription plans and add‑to‑cart logic
  - Collection accordion
  - Stats counter animation

## How to Customize
- Update content (texts, prices, labels) directly in `index.html`.
- Adjust colors, spacing or breakpoints in `css/style.css`.
- Extend the add‑to‑cart URL logic in `js/script.js` by editing the mapping object if more combinations are needed.

## License
This project was created as part of a front‑end assignment. Use and reuse are subject to the original design owner’s guidelines.
```
