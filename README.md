# davidatoms.github.io

Personal portfolio site for David Adams — researcher, data science consultant, and JHU student.

Live at: **https://davidatoms.github.io**

## What it is

A minimal three-pane static site with:

- **Left** — Multimedia gallery: project visuals, research figures, and a YouTube embed
- **Center** — Working projects and blog links (Google Docs presentations and write-ups)
- **Right** — Profile, bio, and contact info

Includes a dark/light mode toggle with preference saved to `localStorage`.

## Structure

```
index.html                  # Single-page entry point
assets/
  css/minimal.css           # All styles
  images/                   # Profile photo and abstract project images
pages/
  privacy.html              # General privacy policy
  snowflake-policy.html     # Privacy policy for Snowflake data listings
```

## Running locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

No build step, no dependencies.

## About

David researches the intersection of artificial and biological neural networks, with a focus on automation and augmentation that enhances human reasoning. He is a data science consultant at [dammastock, LLC](https://dammastock.com), which integrates diverse datasets to surface hidden market signals for financial analysis.

- GitHub: [@davidatoms](https://github.com/davidatoms)
- LinkedIn: [@davidadams64](https://linkedin.com/in/davidadams64)
- Email: davidadams14159@gmail.com
