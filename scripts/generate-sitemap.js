import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProjects } from '../src/data/initialProjects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const BASE_URL = 'https://www.kasseltech.com';

const today = new Date().toISOString().split('T')[0];

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Routes -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

// Inject Dynamic Project Routes
initialProjects.forEach(project => {
  if (project.slug) {
    sitemapContent += `  <url>
    <loc>${BASE_URL}/projects/${project.slug}</loc>
    <lastmod>${project.date ? project.date + '-01' : today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  }
});

sitemapContent += `</urlset>`;

fs.writeFileSync(SITEMAP_PATH, sitemapContent);
console.log(`Successfully generated dynamic sitemap with ${initialProjects.length} project URLs!`);
