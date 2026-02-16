# Design System & Style Guide

## Colors

### Primary Palette
```javascript
primary: {
  50: '#f0f9ff',   // Lightest
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',  // Base
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',  // Darkest
}
```

### Neutral Palette
- Light mode: `zinc-50` to `zinc-900`
- Dark mode: `zinc-900` to `zinc-50` (inverted)

### Using Colors
```jsx
// Text
className="text-zinc-900 dark:text-zinc-50"

// Backgrounds
className="bg-white dark:bg-zinc-950"

// Accents
className="text-primary-600 dark:text-primary-400"

// Hover states
className="hover:text-primary-700 dark:hover:text-primary-300"
```

## Typography

### Font Families
- **Sans-serif**: Inter (body text, headings)
- **Monospace**: JetBrains Mono (code)

### Font Sizes
```javascript
// Headings
h1: text-5xl md:text-7xl (48px - 72px)
h2: text-3xl md:text-4xl (30px - 36px)
h3: text-2xl md:text-3xl (24px - 30px)

// Body
p: text-lg (18px)
small: text-sm (14px)
```

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

## Spacing

Use Tailwind's spacing scale consistently:
- `gap-6` for flex/grid gaps
- `p-6` or `p-8` for padding
- `mb-6` for margins
- `py-24` for section spacing

## Border Radius

- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-lg` (8px)
- Images: `rounded-xl` (12px)
- Small elements: `rounded-lg` (8px)

## Shadows

```javascript
// Light
className="shadow-lg"

// Interactive hover
className="hover:shadow-2xl"

// Glass effect
className="glass-effect" // Custom class (see index.css)
```

## Animations

### Framer Motion Patterns

#### Page Entrance
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

#### Hover Effects
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

#### Scroll Reveal
```jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### Animation Timing
- Fast: 0.2s - 0.3s (micro-interactions)
- Normal: 0.5s - 0.6s (page transitions)
- Slow: 0.8s - 1s (dramatic reveals)

## Components

### Button
```jsx
<button className="
  px-6 py-3 
  bg-primary-600 hover:bg-primary-700 
  dark:bg-primary-500 dark:hover:bg-primary-600
  text-white 
  rounded-lg 
  font-medium
  transition-colors duration-200
  shadow-lg hover:shadow-xl
">
  Click Me
</button>
```

### Card
```jsx
<div className="
  glass-effect 
  rounded-2xl 
  p-8 
  shadow-lg 
  hover:shadow-2xl
  transition-all duration-300
">
  {/* Content */}
</div>
```

### Link
```jsx
<a className="
  text-primary-600 dark:text-primary-400
  hover:text-primary-700 dark:hover:text-primary-300
  underline underline-offset-4
  transition-colors
">
  Link Text
</a>
```

## Layout

### Max Width
```jsx
// Container
className="max-w-6xl mx-auto px-6"

// Reading content
className="max-w-3xl mx-auto px-6"
```

### Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### Flex
```jsx
<div className="flex items-center justify-between gap-6">
```

## Responsive Design

### Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Usage
```jsx
<div className="
  text-base md:text-lg lg:text-xl
  p-4 md:p-6 lg:p-8
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
```

## Dark Mode

### Implementation
Always provide both light and dark styles:
```jsx
<div className="
  bg-white dark:bg-zinc-900
  text-zinc-900 dark:text-zinc-50
  border-zinc-200 dark:border-zinc-800
">
```

### Color Guidelines
- Use `zinc` for neutrals
- Primary colors: lighter shades in dark mode
- Backgrounds: near-black (`zinc-950`) not pure black
- Text: near-white (`zinc-50`) not pure white

## Code Blocks

### Inline Code
```jsx
<code className="
  bg-zinc-100 dark:bg-zinc-800
  px-1.5 py-0.5
  rounded
  text-sm
  font-mono
  text-primary-600 dark:text-primary-400
">
  inline code
</code>
```

### Code Block
Uses `rehype-highlight` with Tokyo Night Dark theme.
Automatically styled via `prose-custom` class.

## Icons

Using Heroicons (outline style) from Tailwind UI:
```jsx
// Size
className="w-5 h-5"  // Small
className="w-6 h-6"  // Medium
className="w-8 h-8"  // Large

// Color
className="text-current"
```

## Best Practices

### Consistency
- Use the same spacing scale throughout
- Stick to defined colors
- Maintain animation timing patterns

### Accessibility
- Sufficient color contrast (WCAG AA)
- Focus visible styles
- Semantic HTML
- Alt text for images

### Performance
- Use `loading="lazy"` for images
- Implement `viewport={{ once: true }}` for scroll animations
- Avoid excessive animations

### Maintainability
- Keep components small
- Extract repeated patterns
- Use semantic names
- Document custom utilities

## Custom Utilities

### Glass Effect
```css
.glass-effect {
  @apply bg-white/80 dark:bg-zinc-900/80 
         backdrop-blur-md 
         border border-zinc-200/50 dark:border-zinc-800/50;
}
```

### Prose Custom
Custom markdown styling (see `src/index.css`)

## File Organization

```
src/
├── components/     # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ...
├── pages/         # Page-level components
├── hooks/         # Custom React hooks
└── utils/         # Helper functions
```

## Adding New Components

1. Create in appropriate directory
2. Use existing patterns
3. Support dark mode
4. Add animations thoughtfully
5. Make it responsive
6. Test both themes

---

**Maintain this aesthetic throughout the project for a cohesive experience.**
