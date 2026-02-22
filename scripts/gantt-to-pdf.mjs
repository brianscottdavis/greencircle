#!/usr/bin/env node
/**
 * Converts GANTT_CHART.html to PDF with rendered Mermaid diagram.
 * Run: node scripts/gantt-to-pdf.mjs
 * Requires: npx puppeteer (will prompt on first run)
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const path = await import('path');
const { fileURLToPath } = await import('url');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const htmlPath = path.resolve(__dirname, '../docs/deliverables/GANTT_CHART.html');
const pdfPath = path.resolve(__dirname, '../docs/deliverables/GANTT_CHART.pdf');

async function main() {
  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.log('Installing puppeteer... (one-time)');
    const { execSync } = await import('child_process');
    execSync('cd ' + path.resolve(__dirname, '..') + ' && npm install puppeteer --no-save', {
      stdio: 'inherit',
    });
    puppeteer = await import('puppeteer');
  }

  const browser = await puppeteer.default.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  await page.waitForSelector('.mermaid svg', { timeout: 10000 });
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
    printBackground: true,
  });
  await browser.close();
  console.log('PDF saved: docs/deliverables/GANTT_CHART.pdf');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
