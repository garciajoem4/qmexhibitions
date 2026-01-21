# QMurphy Exhibitions - Modern Website

A modern, glass-style website for QMurphy Exhibitions built with React, GSAP, and Tailwind CSS. Features smooth scrolling, parallax effects, and stunning animations.

## 🚀 Features

- **Glass Morphism Design** - Modern frosted glass UI inspired by iOS/iPhone design
- **Smooth Scrolling** - Powered by Lenis for butter-smooth scroll experience
- **GSAP Animations** - Professional animations including parallax, reveals, and hover effects
- **Fully Responsive** - Optimized for all devices from mobile to desktop
- **Custom Cursor** - Interactive cursor with hover effects (desktop only)
- **Dark Theme** - Elegant dark theme with gold accents
- **Component-Based** - Scalable architecture with reusable components

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components
│   │   ├── Navbar.jsx   # Navigation bar
│   │   ├── Footer.jsx   # Footer component
│   │   └── index.js     # Layout exports
│   │
│   ├── sections/        # Page sections
│   │   ├── Hero.jsx     # Hero section with video
│   │   ├── About.jsx    # About section
│   │   ├── Services.jsx # Services grid
│   │   ├── Projects.jsx # Portfolio/projects
│   │   ├── Contact.jsx  # Contact form
│   │   └── index.js     # Section exports
│   │
│   └── ui/              # Reusable UI components
│       ├── BackgroundOrbs.jsx  # Animated background
│       ├── Button.jsx          # Button component
│       ├── CustomCursor.jsx    # Custom cursor
│       ├── GlassCard.jsx       # Glass card component
│       ├── SectionTitle.jsx    # Section title
│       └── index.js            # UI exports
│
├── hooks/               # Custom React hooks
│   ├── useInView.js     # Viewport detection
│   ├── useMagneticEffect.js # Magnetic hover effect
│   ├── useWindowSize.js # Window dimensions
│   └── index.js         # Hook exports
│
├── utils/               # Utility functions
│   ├── animations.js    # GSAP animation helpers
│   ├── helpers.js       # General utilities
│   └── index.js         # Utility exports
│
├── constants/           # App constants
│   └── index.js         # Company info, navigation, etc.
│
├── styles/              # Global styles
│   └── index.css        # Tailwind + custom CSS
│
├── App.jsx              # Main app component
└── main.jsx             # React entry point
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library
- **Lenis** - Smooth scroll library
- **React Router** - Navigation

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize colors:

```js
colors: {
  primary: { ... },
  accent: {
    gold: '#D4AF37',
    copper: '#B87333',
    bronze: '#CD7F32',
  },
}
```

### Animations

GSAP animations can be customized in:
- Individual component files
- `src/utils/animations.js` for reusable animations

### Content

Update company information in `src/constants/index.js`:
- Company details
- Navigation links
- Services
- Social links

## 📱 Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📄 License

© 2026 QMurphy Exhibitions. All Rights Reserved.
