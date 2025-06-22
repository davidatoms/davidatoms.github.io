# DAVID'S MARGINS - Personal Blog

A modern, responsive personal blog focused on economic insights and analysis.

## Project Structure

```
├── index.html              # Main HTML file
├── package.json            # Project configuration
├── README.md              # Documentation
├── assets/                # Static assets
│   ├── css/
│   │   └── main.css       # Consolidated styles
│   └── js/
│       └── script.js      # JavaScript functionality
└── components/            # Reusable components
    ├── digital-clock.html
    ├── left-pane.html
    ├── middle_pane.html
    └── right_pane.html
```

## Features

- **Clean, Modern Design**: Minimalist three-pane layout with professional styling
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Component-Based Architecture**: Modular components for easy maintenance
- **Typography**: Uses Karla font for a clean, modern aesthetic
- **Organized Structure**: Clear separation of concerns with dedicated directories

## Development

### Local Development
```bash
# Start a local development server
npm run dev
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### File Organization

- **`assets/css/`**: All stylesheets consolidated into `main.css`
- **`assets/js/`**: JavaScript files
- **`components/`**: Reusable HTML components for each pane
- **`index.html`**: Main entry point that assembles all components

## Customization

### Adding Content
1. Edit component files in the `components/` directory
2. Modify `assets/css/main.css` for styling changes
3. Update `assets/js/script.js` for interactive functionality

### Styling
- The CSS is organized into logical sections:
  - Base styles
  - Layout
  - Pane styles
  - Components
  - Responsive design

### Components
Each pane is modularized:
- **Left Pane**: Digital clock, site title, about section
- **Middle Pane**: Main content and work portfolio
- **Right Pane**: Navigation and additional information

## Deployment

This site is ready for deployment to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design supports mobile devices
- CSS Grid and Flexbox for layout
- Progressive enhancement approach

## Contributing

1. Make changes to component files in `components/`
2. Update styles in `assets/css/main.css`
3. Test locally with `npm run dev`
4. Commit and push changes

---

*Built with semantic HTML, organized CSS, and vanilla JavaScript for optimal performance and maintainability.*

