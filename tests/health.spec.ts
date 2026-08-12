import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const routesPath = path.resolve('c:\\Users\\LOQ\\.gemini\\antigravity\\brain\\78a88fc0-00f4-4eef-918c-35c3ec82723e\\scratch\\routes.json');
const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));

// Test against local dev server to ensure it's not rate-limited by Vercel
const BASE_URL = 'https://toolzium.com';

test.describe('Tool Health Check', () => {
  for (const route of routes) {
    test(`health check for ${route}`, async ({ page }) => {
      let pageErrors = [];

      page.on('pageerror', exception => {
        pageErrors.push(exception.message);
      });

      const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded' });
      expect(response.status()).toBe(200);

      await page.waitForTimeout(500);

      const bodyText = await page.textContent('body');
      const hasReactError = bodyText.includes('Application error: a client-side exception has occurred') 
        || bodyText.includes('An unexpected error has occurred.');
      
      expect(hasReactError).toBe(false);
      expect(pageErrors.length).toBe(0);
    });
  }
});
