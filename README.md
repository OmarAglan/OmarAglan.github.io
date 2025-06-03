# Portfolio Website - Omar Aglan

[![Deploy to GitHub Pages](https://github.com/OmarAglan/omardev.engineer/actions/workflows/deploy.yml/badge.svg)](https://github.com/OmarAglan/omardev.engineer/actions/workflows/deploy.yml)
[![PR Quality Check](https://github.com/OmarAglan/omardev.engineer/actions/workflows/pr-check.yml/badge.svg)](https://github.com/OmarAglan/omardev.engineer/actions/workflows/pr-check.yml)

A modern, high-performance portfolio website built with React, TypeScript, and Vite. Features an advanced blog system, automated deployment, and comprehensive optimizations.

🌐 **Live Site**: [omardev.engineer](https://omardev.engineer)

## ✨ Features

### 🎯 Core Portfolio Features
- **Interactive Video Showcase**: Hover-to-play project demonstrations
- **Responsive Design**: Optimized for all device sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Fast Loading**: Optimized bundles with code splitting

### 📝 Advanced Blog System
- **Enhanced Search Engine**: Full-text search with intelligent suggestions
- **Dark/Light Theme**: Automatic system preference detection
- **Reading Progress**: Linear and circular progress indicators
- **Social Sharing**: Native sharing APIs with fallbacks
- **Related Posts**: AI-powered content recommendations
- **Markdown Support**: Enhanced markdown with syntax highlighting

### 🚀 Production-Ready Infrastructure
- **Automated Deployment**: GitHub Actions CI/CD to GitHub Pages
- **Quality Assurance**: Automated linting, type checking, and testing
- **Performance Optimization**: Code splitting, minification, and caching
- **SEO Optimized**: Automatic sitemap generation and robots.txt

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS Modules, CSS Custom Properties
- **Animations**: Framer Motion
- **Code Highlighting**: React Syntax Highlighter
- **Build Tool**: Vite with optimized production builds
- **Deployment**: GitHub Actions → GitHub Pages
- **Domain**: Custom domain with HTTPS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OmarAglan/omardev.engineer.git
   cd omardev.engineer
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Development Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `npm run dev` | Development server | Local development |
| `npm run build` | Production build with sitemap | CI/CD pipeline |
| `npm run build:prod` | Build with quality checks | Manual deployment |
| `npm run type-check` | TypeScript validation | Quality assurance |
| `npm run lint` / `lint:fix` | Code quality | Development/CI |
| `npm run preview` | Preview production build | Testing |
| `npm run clean` | Clean build artifacts | Maintenance |
| `npm run analyze` | Bundle size analysis | Performance monitoring |
| `npm run generate:sitemap` | Generate SEO sitemap | SEO optimization |

## 📁 Project Structure

```
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── public/                 # Static assets
│   ├── robots.txt         # SEO configuration
│   └── sitemap.xml        # Generated sitemap
├── scripts/
│   └── generate-sitemap.js # Sitemap generation
├── src/
│   ├── components/        # React components
│   │   ├── Blog/         # Blog system components
│   │   ├── EnhancedSearch/ # Advanced search
│   │   ├── ReadingProgress/ # Progress tracking
│   │   ├── SocialShare/  # Social sharing
│   │   └── RelatedPosts/ # Content recommendations
│   ├── contexts/         # React contexts (theme, etc.)
│   ├── data/            # Blog posts and content
│   ├── pages/           # Page components
│   ├── types/           # TypeScript definitions
│   ├── utils/           # Utility functions
│   └── App.tsx          # Main application
├── DEPLOYMENT.md        # Deployment documentation
└── BUILD_SYSTEM_IMPROVEMENTS.md # Technical details
```

## 🎨 Blog System Features

### 🔍 Enhanced Search Engine
- **Full-text search** with weighted scoring
- **Real-time suggestions** with keyboard navigation
- **Search highlighting** and result previews
- **Recent searches** with localStorage persistence
- **Mobile-optimized** compact search interface

```tsx
<EnhancedSearch
  posts={blogPosts}
  placeholder="Search articles..."
  maxResults={8}
  showSuggestions={true}
/>
```

### 🌓 Theme System
- **Dark/Light modes** with system preference detection
- **Smooth transitions** between themes
- **CSS custom properties** for consistent theming
- **Theme persistence** in localStorage

```tsx
const { theme, setTheme, toggleTheme } = useTheme();
```

### 📊 Reading Progress
- **Linear progress bar** at the top of articles
- **Circular indicator** with reading time estimates
- **Scroll-based calculation** for accurate progress
- **Mobile-responsive** design

```tsx
<ReadingProgress showPercentage={true} />
<CircularReadingProgress size={60} strokeWidth={4} />
```

### 📱 Social Sharing
- **Multiple platforms**: Twitter, LinkedIn, Facebook, Reddit, WhatsApp, Email
- **Native sharing API** support for mobile devices
- **Copy-to-clipboard** functionality
- **Floating share button** with animations

```tsx
<SocialShare
  variant="horizontal"
  showLabels={true}
  hashtags={["webdev", "react"]}
/>
```

### 🔗 Related Posts Engine
- **Intelligent relevance scoring** based on category, tags, and recency
- **Multiple display variants** (full, compact, by-tags)
- **Animated hover effects** and responsive design
- **Featured post highlighting**

```tsx
<RelatedPosts 
  currentPost={post}
  allPosts={allPosts}
  maxPosts={3}
/>
```

## 🚀 Deployment & Build System

### Automated Deployment
The site automatically deploys to GitHub Pages on every push to the main branch:

1. **Quality Checks**: ESLint, TypeScript validation, build verification
2. **Optimization**: Code splitting, minification, asset optimization
3. **SEO**: Automatic sitemap generation, robots.txt configuration
4. **Deployment**: GitHub Pages with custom domain support

### GitHub Actions Workflows

#### Main Deployment (`.github/workflows/deploy.yml`)
- **Triggers**: Push to main/master, manual workflow dispatch
- **Process**: Install → Lint → Type Check → Build → Deploy
- **Optimizations**: Node.js 20, npm caching, artifact optimization

#### PR Quality Checks (`.github/workflows/pr-check.yml`)
- **Purpose**: Prevent broken code from reaching main branch
- **Checks**: ESLint, TypeScript, build verification, bundle size

### Build Optimizations

#### Code Splitting Strategy
```javascript
manualChunks: {
  vendor: ['react', 'react-dom', 'react-router-dom'],
  motion: ['framer-motion'],
  syntax: ['react-syntax-highlighter'],
}
```

#### Performance Features
- **Minification**: Terser for JS, CSS minification
- **Asset Optimization**: Hash-based naming for cache busting
- **Bundle Analysis**: Size monitoring and optimization
- **Source Maps**: Disabled in production for smaller bundles

### SEO Optimizations
- **Automatic Sitemap**: Generated on every build (8 URLs)
- **Robots.txt**: Search engine friendly configuration
- **SPA Support**: 404.html for client-side routing
- **Custom Domain**: HTTPS with proper CNAME configuration

## 🔧 Configuration

### Environment Setup
No environment variables required. Configuration through:
- `vite.config.ts`: Build and development settings
- `package.json`: Scripts and dependencies
- `CNAME`: Custom domain configuration

### Theme Customization
Add CSS custom properties to your stylesheet:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: rgba(0, 0, 0, 0.02);
  --text-primary: #1a1a1a;
  --text-secondary: rgba(0, 0, 0, 0.8);
  --accent-color: #4169E1;
  --border-color: rgba(0, 0, 0, 0.1);
}
```

## 📊 Performance Metrics

### Bundle Sizes
- **Search engine**: ~8KB gzipped
- **Theme system**: ~3KB gzipped
- **All blog components**: ~25KB gzipped total

### Performance Goals
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <3s

### Analysis Tools
```bash
npm run analyze  # Bundle size analysis
npm run preview  # Test production build
```

## 🔍 Monitoring & Maintenance

### Build Status
- Monitor GitHub Actions for deployment status
- Check bundle sizes with analysis tools
- Verify functionality after deployments

### Performance Monitoring
- Use browser dev tools for Core Web Vitals
- Regular Lighthouse audits
- Bundle size tracking

### SEO Monitoring
- Verify sitemap at `/sitemap.xml`
- Check robots.txt at `/robots.txt`
- Monitor search engine indexing

## 🐛 Troubleshooting

### Common Issues

#### Build Failures
```bash
npm run type-check  # Check TypeScript errors
npm run lint        # Check linting errors
npm ci              # Reinstall dependencies
npm run clean       # Clear cache
```

#### Routing Issues
- Verify 404.html is generated during build
- Check base URL in `vite.config.ts`
- Test with `npm run preview`

#### Performance Issues
```bash
npm run analyze     # Analyze bundle size
npm run clean       # Clear build cache
npm run build       # Rebuild optimized version
```

### Getting Help
1. Check GitHub Actions logs for build errors
2. Verify local build: `npm run build:prod`
3. Test preview: `npm run preview`
4. Check browser console for runtime errors

## 🎯 Development Workflow

### Local Development
1. **Start development**: `npm run dev`
2. **Make changes**: Edit files, see live updates
3. **Quality check**: `npm run build:prod`
4. **Preview build**: `npm run preview`

### Deployment Process
1. **Push to main**: Triggers automatic deployment
2. **Quality gates**: Automated checks run
3. **Build & optimize**: Vite builds optimized bundle
4. **Deploy**: GitHub Pages deployment
5. **Live site**: Available at omardev.engineer

### Pull Request Workflow
1. **Create PR**: Quality checks run automatically
2. **Code review**: Automated and manual reviews
3. **Merge**: Triggers deployment to production

## 🚀 Performance Optimizations

### Implemented Optimizations
- **Code Splitting**: Vendor, motion, and syntax chunks
- **Tree Shaking**: Eliminates unused code
- **Minification**: Terser for JS, CSS minification
- **Asset Optimization**: Hash-based caching
- **Lazy Loading**: Components loaded on demand

### Bundle Analysis
The `npm run analyze` command provides:
- Bundle size breakdown
- Dependency analysis
- Optimization opportunities
- Performance recommendations

## 🔮 Future Enhancements

### Planned Features
- **Analytics Integration**: User behavior tracking
- **Content Management**: Admin interface for posts
- **PWA Features**: Offline reading capability
- **Voice Search**: Speech recognition API
- **AI Recommendations**: Machine learning suggestions

### Performance Goals
- **Virtual Scrolling**: For large content lists
- **Image Optimization**: WebP conversion and lazy loading
- **Service Worker**: Advanced caching strategies
- **Code Splitting**: Further optimization opportunities

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test them
4. Run quality checks: `npm run build:prod`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📞 Contact

**Omar Aglan**
- Website: [omardev.engineer](https://omardev.engineer)
- LinkedIn: [LinkedIn Profile](https://linkedin.com/in/omaraglan)
- GitHub: [@OmarAglan](https://github.com/OmarAglan)

---

⭐ **Star this repository** if you find it helpful!

Built with ❤️ using React, TypeScript, and modern web technologies.
