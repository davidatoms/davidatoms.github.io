# davidatoms.github.io

David Adams' personal profile site, hosted on GitHub Pages.

A minimal, single-page, three-pane layout:

- **Left pane** — a scrolling gallery of visualizations, generative art, and photos
- **Center pane** — reserved for future project/writing content (currently empty)
- **Right pane** — bio, current work, and contact links

## Structure

```
├── index.html                  # The entire site (single page)
├── assets/
│   ├── css/
│   │   └── minimal.css         # All styling, incl. dark mode
│   └── images/                 # Gallery images (WebP)
│       └── abstract/           # Generative/abstract art subset
└── pages/
    └── snowflake-policy.html   # Data privacy policy for a Snowflake Marketplace listing
```

## Local development

No build step. Serve the directory and open it in a browser:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editing content

- Bio, contact links, and current work: edit the `#profile` section in [index.html](index.html).
- Gallery images: add a `.project-panel` block in the `#visual` section of [index.html](index.html), pointing at an image in `assets/images/`. Prefer WebP, keep the longest edge at or under 1000px, and include `width`, `height`, and `loading="lazy"` attributes to avoid layout shift and keep the page fast.

## Deployment

Pushes to `main` deploy automatically via GitHub Pages.
