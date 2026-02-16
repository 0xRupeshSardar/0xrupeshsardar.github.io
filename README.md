# 0xrupeshsardar.github.io

A high-end, modern static blog built with React, optimized for GitHub Pages. Features exceptional UI polish, smooth micro-interactions, and an outstanding reading experience.

## ✨ Features

- **Modern Tech Stack**: React + Vite for blazing-fast development and builds
- **Beautiful UI**: Tailwind CSS with custom design tokens and premium aesthetics
- **Smooth Animations**: Framer Motion for professional micro-interactions
- **Dark Mode**: Seamless theme switching with persistent preferences
- **Code Highlighting**: Syntax highlighting with copy-to-clipboard functionality
- **Reading Progress**: Visual progress bar for blog posts
- **Responsive Design**: Looks perfect on all devices
- **Optimized Performance**: Lazy loading, code splitting, and optimized assets

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 11
- **Routing**: React Router 7
- **Markdown**: react-markdown with syntax highlighting
- **Code Highlighting**: rehype-highlight with Tokyo Night Dark theme

## 📁 Project Structure

```
0xrupeshsardar.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── content/
│   └── posts/
│       └── sample-post.md      # Blog post content
├── public/
│   ├── content/
│   │   └── posts/              # Public markdown files
│   └── .nojekyll              # GitHub Pages config
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Footer.jsx         # Site footer
│   │   ├── Layout.jsx         # Page layout wrapper
│   │   ├── BlogCard.jsx       # Blog post card
│   │   ├── CodeBlock.jsx      # Code block with copy
│   │   └── ScrollProgress.jsx # Reading progress bar
│   ├── hooks/
│   │   ├── useTheme.jsx       # Dark mode hook
│   │   └── useScrollProgress.jsx # Scroll tracking
│   ├── pages/
│   │   ├── Home.jsx           # Home page
│   │   └── BlogPost.jsx       # Blog post page
│   ├── App.jsx                # Router configuration
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
└── README.md

```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
cd 0xrupeshsardar.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📝 Adding New Blog Posts

1. Create a new markdown file in `content/posts/`:
```bash
touch content/posts/my-new-post.md
```

2. Write your content with frontmatter:
```markdown
# Your Title

Your content here...
```

3. Copy to public folder:
```bash
cp content/posts/my-new-post.md public/content/posts/
```

4. Update the blog post data in `src/pages/Home.jsx`

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Fonts

Update the Google Fonts import in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

### Dark Mode

The theme is managed in `src/hooks/useTheme.jsx`. Customize the behavior there.

## 🚀 Deployment

### GitHub Pages (Automated)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

3. The GitHub Action will automatically build and deploy

### Manual Deployment

```bash
npm run build
npm run deploy
```

## 📄 License

MIT License - feel free to use this project for your own blog!

## 🙏 Acknowledgments

- Design inspired by high-end engineering blogs
- Built with modern web technologies
- Optimized for performance and accessibility

---

**Built with ❤️ by Rupesh Sardar**
