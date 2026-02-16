# Deployment Guide

## Quick Start

### Development
```bash
npm run dev
```
Visit `http://localhost:5173` to see your blog

### Production Build
```bash
npm run build
```
The build output will be in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/0xrupeshsardar/0xrupeshsardar.github.io.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment", select **Source**: GitHub Actions
   
3. **Wait for Deployment**:
   - The GitHub Action will automatically trigger
   - Check the **Actions** tab to monitor deployment
   - Your site will be live at: `https://0xrupeshsardar.github.io/0xrupeshsardar.github.io/`

### Manual Deployment with gh-pages

```bash
npm run deploy
```

This will build and push to the `gh-pages` branch automatically.

## Project Configuration

### Base URL
The base URL is configured in `vite.config.js`:

```javascript
base: '/0xrupeshsardar.github.io/'
```

**Important**: 
- For `username.github.io` repos, set `base: '/'`
- For project repos, set `base: '/repo-name/'`

### Router Configuration
The router in `src/App.jsx` uses the same base:

```javascript
<Router basename="/0xrupeshsardar.github.io">
```

Make sure both match!

## Custom Domain (Optional)

1. **Add CNAME file** to `public/` folder:
   ```
   yourdomain.com
   ```

2. **Update repository settings**:
   - Go to Settings → Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

3. **Update your domain DNS**:
   - Add a CNAME record pointing to `0xrupeshsardar.github.io`

4. **Update base URL**:
   ```javascript
   // vite.config.js
   base: '/'
   
   // src/App.jsx
   <Router basename="/">
   ```

## Troubleshooting

### 404 on Refresh
GitHub Pages serves static files, so you need to handle routing:
- The current setup uses hash routing which works out of the box
- For SPA routing, add a 404.html that redirects to index.html

### Assets Not Loading
- Check that `base` is set correctly in `vite.config.js`
- Ensure `.nojekyll` file exists in `public/`

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Dark Mode Not Persisting
- Check browser localStorage is enabled
- Clear site data and try again

## Performance Optimization

The build is optimized with:
- Code splitting by vendor chunks
- Lazy loading of images
- Tree shaking of unused code
- Minification and compression

### Bundle Analysis
To analyze bundle size:
```bash
npm run build -- --mode analyze
```

## Environment Variables

Create `.env` files for different environments:

```bash
# .env.development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_API_URL=https://api.yoursite.com
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## CI/CD Pipeline

The GitHub Action (`.github/workflows/deploy.yml`) handles:
1. Checkout code
2. Install dependencies
3. Build the project
4. Deploy to GitHub Pages

### Customizing the Workflow

Edit `.github/workflows/deploy.yml` to:
- Add tests before deployment
- Deploy to different branches
- Add notifications

## Security

- Dependencies are checked for vulnerabilities during install
- Run `npm audit` regularly
- Keep dependencies updated: `npm update`

## Backup

Always keep backups:
```bash
# Backup content
cp -r content content-backup

# Backup configuration
cp package.json package.json.backup
cp vite.config.js vite.config.js.backup
```

## Support

For issues:
1. Check GitHub Actions logs
2. Review browser console for errors
3. Verify all paths are correct
4. Ensure Node.js version is 18+

---

**Happy Blogging! 🚀**
