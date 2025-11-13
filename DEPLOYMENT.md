# Deployment Guide - Custom Domain Setup

This portfolio is deployed to https://omardev.engineer using GitHub Pages.

## Prerequisites
- Node.js 18+ and npm installed
- GitHub repository: OmarAglan/OmarAglan.github.io
- Custom domain: omardev.engineer
- Domain DNS access for configuration

## Initial DNS Setup

Configure your domain (omardev.engineer) DNS records:

### Option 1: A Records (Recommended for apex domain)
Add these A records pointing to GitHub Pages:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Option 2: CNAME Record (For www subdomain)
```
www.omardev.engineer -> OmarAglan.github.io
```

### Recommended: Both
- Add A records for apex domain (omardev.engineer)
- Add CNAME for www subdomain (www.omardev.engineer -> omardev.engineer)

Note: DNS propagation can take 24-48 hours.

## GitHub Repository Settings

1. Go to repository settings: https://github.com/OmarAglan/OmarAglan.github.io/settings/pages
2. Under "Custom domain", enter: `omardev.engineer`
3. Check "Enforce HTTPS" (wait for SSL certificate to provision, ~24 hours)
4. Save the settings

## Deployment Steps

1. Install dependencies:
```bash
npm install
```

2. Build and deploy:
```bash
npm run deploy
```

This will:
- Compile TypeScript and build with Vite
- Deploy the `dist/` folder to the `gh-pages` branch
- Preserve the CNAME file for custom domain
- Site will be available at: https://omardev.engineer

## Manual Build & Preview

Build without deploying:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

## File Structure

```
public/
├── CNAME              # Contains: omardev.engineer
├── .nojekyll          # Prevents Jekyll processing
└── assets/
    └── resume.pdf     # Downloadable resume
```

## Important Configuration Files

- public/CNAME: Contains custom domain (omardev.engineer)
- public/.nojekyll: Prevents Jekyll processing
- vite.config.ts: Base path set to '/' for custom domain
- package.json: Homepage set to https://omardev.engineer

## Troubleshooting

### Site not loading / 404 errors
- Verify CNAME file is in `public/` directory
- Check vite.config.ts has `base: '/'`
- Ensure DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Check GitHub Pages settings in repository

### Assets not loading
- Verify base path is '/' in vite.config.ts
- Check asset paths use relative references
- Clear browser cache
- Inspect browser console for errors

### SSL/HTTPS issues
- GitHub Pages SSL provisioning takes time
- Ensure "Enforce HTTPS" is checked in repo settings
- Wait 24 hours after initial setup

### Custom domain not working
- Verify CNAME file contains only: omardev.engineer
- Check DNS configuration with: `dig omardev.engineer`
- Verify GitHub Pages settings show your custom domain

## EmailJS Configuration

Configure the contact form:
1. Sign up at https://emailjs.com
2. Create an email service
3. Create a template using `docs/email/EmailJS-Contact-Template.html`
4. Update credentials in `src/components/Contact.tsx`:
   - Service ID
   - Template ID  
   - Public Key
5. Configure allowed domains in EmailJS dashboard:
   - https://omardev.engineer
   - http://localhost:5173 (for development)

## Post-Deployment Verification

After deploying, verify:
1. ✅ Site loads at https://omardev.engineer
2. ✅ HTTPS is working (secure padlock icon)
3. ✅ All sections scroll smoothly
4. ✅ Navigation links work
5. ✅ Contact form submits (after EmailJS config)
6. ✅ Resume downloads correctly
7. ✅ All animations work
8. ✅ Mobile responsive design functions
9. ✅ No console errors

## Continuous Deployment (Optional)

The GitHub Actions workflow in `.github/workflows/deploy.yml` provides automatic deployment on every push to main branch.

## Support

For issues:
- GitHub Pages docs: https://docs.github.com/pages
- Custom domain guide: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
- DNS configuration help: Contact your domain registrar
