# Elkris Benevolent Foundation Website

A responsive diabetes-awareness and early-detection website for the Elkris Benevolent Foundation. It introduces the campaign, shares health information, lets visitors explore screening locations, and showcases community outreach.

## Features

- Responsive layout for desktop and mobile
- Campaign, vision and mission, diabetes information, and early-symptom sections
- Interactive symptom-awareness checklist (not a diagnostic tool)
- Screening-center tabs for Abuja, Lagos, Port Harcourt, and Kano
- Outreach photo gallery with an accessible image viewer
- Scroll-reveal and hero animations that respect reduced-motion preferences
- Keyboard-accessible navigation and gallery controls

## Run locally

This is a static website and does not require a package manager, build step, or server.

1. Download or clone the project.
2. Open `index.html` in a modern web browser.

For local development, you can also serve the project directory with any static file server. For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

The web fonts are loaded from Google Fonts, so an internet connection is needed for those fonts. The website itself and its local images are stored in this project.

## Project structure

```text
.
├── index.html    # Page content and semantic markup
├── styles.css    # Layout, responsive styles, and animations
├── script.js     # Navigation, checklist, center tabs, and gallery interactions
├── favicon.svg   # Browser tab icon
└── images/       # Website photography
```

## Content and maintenance

- Edit page sections and image alternatives in `index.html`.
- Update visual styles, responsive breakpoints, and motion in `styles.css`.
- Update interactive behavior in `script.js`.
- Keep referenced photos in `images/` and ensure their file names match the paths in the HTML and CSS.
- Confirm outreach dates and screening-center information with the foundation before publishing updates.

Health information on the website is for awareness and does not replace professional medical advice. The symptom checklist does not diagnose diabetes.
