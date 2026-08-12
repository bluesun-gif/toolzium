import { test, expect } from '@playwright/test';

const BASE_URL = 'https://toolzium.com';
const failedRoutes = [
  '/tools/office/invoice',
  '/tools/text/fancy-text',
  '/tools/text/lorem-ipsum',
  '/tools/time/age',
  '/tools/time/meeting-planner',
  '/tools/time/timezone',
  '/tools/time/weekno'
];

test.describe('Debug Failed Tools', () => {
  for (const route of failedRoutes) {
    test(`debug ${route}`, async ({ page }) => {
      let pageErrors = [];

      page.on('pageerror', exception => {
        pageErrors.push(exception.message);
      });

      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);
      
      if (pageErrors.length > 0) {
        console.log(`=== ERROR ON ${route} ===`);
        console.log(pageErrors);
      }
      
      expect(pageErrors.length).toBe(0);
    });
  }
});
