import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://omardev.engineer';
const currentDate = new Date().toISOString().split('T')[0];

// Define all routes in your application
const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: currentDate
  },
  {
    url: '/portfolio/fullstack',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: currentDate
  },
  {
    url: '/portfolio/gamedev',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: currentDate
  },
  {
    url: '/blog',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: currentDate
  }
];

// Add blog post routes
const blogPostSlugs = [
  'enhanced-markdown-features',
  'getting-started-game-dev',
  'web-development-best-practices',
  'ux-design-principles'
];

blogPostSlugs.forEach(slug => {
  routes.push({
    url: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: currentDate
  });
});

// Generate sitemap XML
const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// Write sitemap to public directory
const sitemapContent = generateSitemap();
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

fs.writeFileSync(outputPath, sitemapContent, 'utf8');
console.log('✅ Sitemap generated successfully at:', outputPath);
console.log(`📄 Generated ${routes.length} URLs`);
