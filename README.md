# 🚀 Sameer Khan - Cloud & DevOps Engineer Portfolio

A premium, production-ready portfolio showcasing DevOps expertise with interactive features, modern UI/UX, and comprehensive functionality.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://kkhansameer94.github.io)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## ✨ Features

### 🎨 Premium UI/UX
- **Glassmorphic Dark Theme** - Modern design with blur effects and smooth gradients
- **Responsive Design** - Optimized for mobile (375px+), tablet, and 4K displays
- **Zero Horizontal Scroll** - Perfect viewport handling across all devices
- **Custom CSS Variables** - Modular, maintainable styling system
- **JetBrains Mono & Plus Jakarta Sans** - Professional typography

### 🖥️ Interactive DevOps Terminal
- **Tab Completion** - Press Tab to autocomplete commands
- **Command History** - Use ↑/↓ arrow keys to navigate history
- **DevOps Commands** - Realistic outputs for:
  - `docker ps` - List running containers
  - `kubectl get pods` - Show Kubernetes pods
  - `git status` - Repository status
  - `help`, `skills`, `projects`, `uptime`, `whoami`, `contact`, `clear`
- **Auto-scrolling** - Terminal automatically scrolls to latest output

### 🔄 GitHub API Integration
- **Dynamic Repository Fetching** - Automatically displays latest repos from GitHub
- **Skeleton Loading** - Beautiful loading states while fetching data
- **Graceful Fallback** - Shows static projects if API rate limit reached
- **Smart Filtering** - Excludes forks, displays only quality projects

### 📧 Contact Form with Validation
- **Formspree Integration** - Backend-ready email delivery
- **Real-time Validation** - Email regex, minimum message length
- **Accessible Error Messages** - Clear, user-friendly feedback
- **Toast Notifications** - Success/error messages with smooth animations
- **Loading States** - Spinner and disabled button during submission

### 🎭 Advanced Animations
- **Scroll-triggered Reveals** - Fade-in-up animations using IntersectionObserver
- **3D Tilt Effect** - Project cards respond to mouse movement with perspective
- **Smooth Transitions** - Cubic-bezier easing throughout
- **Typing Effect** - Auto-typing hero subtitle with multiple phrases
- **Counter Animations** - Stats count up when scrolled into view

### 🎯 Additional Features
- **Project Filtering** - Filter by category (All, Cloud & DevOps, Automation)
- **Active Navigation** - Highlights current section in navigation
- **Mobile Menu** - Responsive hamburger menu with smooth animations
- **Floating Tech Badges** - Animated skill badges around avatar
- **Social Links** - GitHub, LinkedIn, Email with hover effects

## 📁 Project Structure

```
Sameer_Khan_Portfolio_Pro/
├── index.html          # Main HTML structure
├── style.css           # Modular CSS with variables and utilities
├── script.js           # Enhanced JavaScript with all features
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Clone or Download

```bash
git clone https://github.com/kkhansameer94/portfolio.git
cd portfolio
```

### 2. Configure Formspree

1. Sign up at [Formspree.io](https://formspree.io/)
2. Create a new form and get your endpoint URL
3. Open `script.js` and update line 6:

```javascript
FORMSPREE_ENDPOINT: 'https://formspree.io/f/YOUR_FORM_ID'
```

### 3. Customize Content

Edit `index.html` to update:
- Personal information (name, email, location)
- Project descriptions
- Skills and proficiency levels
- Social media links

### 4. Launch

Simply open `index.html` in a browser or deploy to any static hosting:

```bash
# Local testing
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🌐 Deployment Options

### GitHub Pages (Recommended)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/kkhansameer94/portfolio.git
git push -u origin main
```
Then enable GitHub Pages in repository settings.

### Netlify
1. Drag and drop folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect GitHub repo for automatic deployments

### Vercel
```bash
npm i -g vercel
vercel
```

## 🎨 Customization Guide

### Modify Color Scheme

Edit CSS variables in `style.css` (lines 7-58):

```css
:root {
  --primary: #38bdf8;        /* Main accent color */
  --secondary: #818cf8;       /* Secondary accent */
  --accent-green: #10b981;    /* Success/active color */
  --bg-dark: #07090e;         /* Background color */
}
```

### Update Terminal Commands

Edit the `commands` object in `script.js` (lines 119-229):

```javascript
const commands = {
  'your-command': `Your command output here`,
  // Add more commands...
};
```

### Change GitHub Username

Update line 5 in `script.js`:

```javascript
GITHUB_USERNAME: 'your-github-username'
```

### Add New Projects

Add project cards in `index.html` within `.projects-grid`:

```html
<article class="project-card glass-panel" data-category="cloud">
  <div class="project-top-row">
    <span class="badge-tag">Your Tag</span>
    <div class="project-links">
      <a href="#" target="_blank"><i class="fa-brands fa-github"></i></a>
    </div>
  </div>
  <h3 class="project-title">Your Project Name</h3>
  <p class="project-desc">Your project description...</p>
  <div class="project-tech-tags">
    <span>Tech1</span>
    <span>Tech2</span>
  </div>
  <div class="project-footer">
    <a href="#" class="link-arrow">View Repository <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
  </div>
</article>
```

## 🔧 Technical Details

### CSS Architecture
- **Modular Sections** - Organized by component
- **CSS Custom Properties** - Easy theme customization
- **Utility Classes** - Reusable helpers (`.fade-in`, `.skeleton`, `.toast`)
- **Mobile-First** - Responsive breakpoints at 480px, 768px, 992px, 1920px
- **Performance** - Hardware acceleration with `will-change` and `transform3d`

### JavaScript Features
- **ES6+ Syntax** - Modern JavaScript throughout
- **Async/Await** - Clean asynchronous code
- **IntersectionObserver** - Performant scroll animations
- **Event Delegation** - Efficient event handling
- **Error Handling** - Graceful degradation and user feedback

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

| Breakpoint | Target Devices | Layout Changes |
|------------|----------------|----------------|
| 375px-480px | Small phones | Single column, stacked buttons |
| 481px-768px | Phones/tablets | Mobile menu, simplified grid |
| 769px-992px | Tablets | 2-column layouts |
| 993px-1919px | Laptops/desktops | Full desktop layout |
| 1920px+ | 4K displays | Expanded max-width containers |

## 🎯 Interactive Features Testing

### Terminal Commands to Test:
```bash
help              # Display all commands
skills            # Show technical stack
projects          # List projects
uptime            # System status
whoami            # Profile info
contact           # Contact details
docker ps         # Docker containers
kubectl get pods  # Kubernetes pods
git status        # Git repository status
clear             # Clear terminal
```

### Terminal Features:
- Type any command and press Enter
- Press Tab for autocomplete
- Use ↑/↓ arrows for command history
- Click terminal to focus input

### Form Validation:
- Try submitting with invalid email
- Try submitting with short message (<10 chars)
- Watch for real-time error messages
- See toast notification on success

## 🐛 Troubleshooting

### GitHub API Rate Limit
If you see "Using static projects" message:
- GitHub API allows 60 requests/hour for unauthenticated requests
- Wait an hour or add GitHub token for higher limits
- Static fallback projects will display automatically

### Form Not Submitting
1. Verify Formspree endpoint is configured
2. Check browser console for errors
3. Ensure internet connection is active
4. Test with valid email format

### Animations Not Working
1. Clear browser cache
2. Ensure JavaScript is enabled
3. Check console for errors
4. Try in different browser

### Mobile Menu Not Opening
1. Verify `menu-toggle` and `nav-links` IDs exist
2. Check JavaScript initialization
3. Test on actual device (not just browser resize)

## 🔒 Security Notes

- Form validation on client and server (via Formspree)
- XSS prevention with `escapeHtml()` utility
- No sensitive data stored in code
- HTTPS recommended for production deployment

## 📊 Performance Optimization

- Lazy loading for images (add `loading="lazy"` attribute)
- Minify CSS/JS for production
- Use CDN for Font Awesome (already configured)
- Optimize images before upload
- Enable gzip compression on server

## 📝 Configuration Checklist

Before deployment, update:
- [ ] Formspree endpoint in `script.js`
- [ ] GitHub username in `script.js`
- [ ] Personal information in `index.html`
- [ ] Email address in contact section
- [ ] LinkedIn URL in social links
- [ ] Project links and descriptions
- [ ] Skills and proficiency percentages
- [ ] Favicon (add to root directory)
- [ ] Meta tags for SEO (description, keywords)

## 🎓 Key Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, Custom Properties)
- **Vanilla JavaScript** - No framework dependencies
- **Font Awesome 6** - Icon library
- **Google Fonts** - Custom typography
- **Formspree** - Form backend
- **GitHub API** - Dynamic content

## 📄 License

MIT License - feel free to use for your own portfolio!

## 🤝 Contributing

Improvements welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Contact

**Sameer Khan**
- Email: sameerkhan.devops@gmail.com
- GitHub: [@kkhansameer94](https://github.com/kkhansameer94)
- Location: Mumbai, Maharashtra, India

---

**Built with ❤️ using modern web technologies**

*Last updated: October 2026*
