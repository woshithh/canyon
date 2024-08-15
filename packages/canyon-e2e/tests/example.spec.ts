import { test, expect } from './baseFixtures';

test('has title', async ({ page }) => {
  await page.goto('https://app.canyoncov.com/login');
  // 填写账号密码
  await page.fill('#basic_username', 'wr_zhang25');
  await page.fill('#basic_password', '123456');
  // 点击continue按钮
  await page.click('button[type="submit"]');
  await page.click('a[href="/projects/new"]');
  await page.waitForTimeout(1000);
  const h2 =await page.locator('h2').textContent()
  expect(h2).toBe('创建项目');
  // 期待h2元素的文本是"Create a new project"
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});
