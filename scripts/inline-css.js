import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const htmlPath = path.join(projectRoot, 'dist', 'index.html');

if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Match: <link rel="stylesheet" crossorigin href="/assets/index-ufA3UdxQ.css">
  const cssRegex = /<link rel="stylesheet" crossorigin href="\/assets\/index-([A-Za-z0-9_-]+)\.css">/;
  const match = html.match(cssRegex);

  if (match) {
    const cssFilename = `index-${match[1]}.css`;
    const cssPath = path.join(projectRoot, 'dist', 'assets', cssFilename);

    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      
      // Replace link tag with style block
      const styleBlock = `<style>${cssContent}</style>`;
      html = html.replace(match[0], styleBlock);

      fs.writeFileSync(htmlPath, html, 'utf8');
      console.log(`Successfully inlined CSS: ${cssFilename} (${cssContent.length} chars)`);

      // Delete original CSS file to keep dist build clean
      fs.unlinkSync(cssPath);
      console.log(`Deleted original CSS file: ${cssFilename}`);
    } else {
      console.warn(`CSS file not found at path: ${cssPath}`);
    }
  } else {
    console.log('No matching external stylesheet found in dist/index.html');
  }
} else {
  console.warn(`dist/index.html not found at path: ${htmlPath}`);
}
