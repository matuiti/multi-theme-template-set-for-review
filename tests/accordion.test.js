import { test, expect } from '@playwright/test';

test.describe('UIテスト(SP)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/test.html');
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => window.testHelper !== undefined);
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test('カテゴリーモーダルメニューを開きアコーディオンを閉じることができる', async ({ page }) => {
    const categoryButton = page.locator('.prj-section-head-sp .prj-button-category-component');
    await categoryButton.click();
    const modalState = await page.evaluate(() => window.testHelper.checkCategoryModal());
    expect(modalState.isVisible).toBe(true);
    const accordionHeader = page.locator('.prj-modal-category-component .category-search-section .prj-filter-menu-accordion-header[data-toggle="main"]');
    await accordionHeader.waitFor({ state: 'visible' });
    await accordionHeader.click();
    const accordionState = await page.evaluate(() => window.testHelper.checkCategoryAccordion('main'));
    expect(accordionState.isVisible).toBe(false);
  });

  test('検索拡張パネルを開くことができる', async ({ page }) => {
    const searchInput = page.locator('.prj-header-icons .prj-header-search-button');
    await searchInput.click();
    const searchState = await page.evaluate(() => window.testHelper.checkSearchExtended());
    expect(searchState.isActive).toBe(true);
  });

  test('ボトムメニュー内のカテゴリメニューを開くことができる', async ({ page }) => {
    const bottomMenu = page.locator('.prj-bottom-menu-footer-button-filter');
    await bottomMenu.click();
    const modalState = await page.evaluate(() => window.testHelper.checkBottomMenu());
    expect(modalState.isVisible).toBe(true);
    const accordionHeader = page.locator('.prj-bottom-menu-component .category-search-section .prj-filter-menu-accordion-header[data-toggle="main"]');
    await accordionHeader.waitFor({ state: 'visible' });
    await accordionHeader.click();
    const accordionState = await page.evaluate(() => window.testHelper.checkBottomMenuAccordion('main'));
    expect(accordionState.isVisible).toBe(false);
  });

});

test.describe('UIテスト(PC)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/test.html');
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => window.testHelper !== undefined);
    await page.setViewportSize({ width: 1024, height: 768 });
  });

  test('モーダルメニューを開きアコーディオンを閉じることができる', async ({ page }) => {
    const hamburgerButton = page.locator('.prj-header-hamburger-button');
    await hamburgerButton.click();
    const modalState = await page.evaluate(() => window.testHelper.checkModal());
    expect(modalState.isVisible).toBe(true);
    const accordionHeader = page.locator('.prj-modal-menu-component .category-search-section .prj-filter-menu-accordion-header[data-toggle="main"]');
    await accordionHeader.waitFor({ state: 'visible' });
    await accordionHeader.click();
    const accordionState = await page.evaluate(() => window.testHelper.checkAccordion('main'));
    expect(accordionState.isVisible).toBe(false);
  });

  test('カテゴリーモーダルメニューを開きアコーディオンを閉じることができる', async ({ page }) => {
    const categoryButton = page.locator('.prj-section-head-pc .prj-button-category-component');
    await categoryButton.click();
    const modalState = await page.evaluate(() => window.testHelper.checkCategoryModal());
    expect(modalState.isVisible).toBe(true);
    const accordionHeader = page.locator('.prj-modal-category-component .category-search-section .prj-filter-menu-accordion-header[data-toggle="main"]');
    await accordionHeader.waitFor({ state: 'visible' });
    await accordionHeader.click();
    const accordionState = await page.evaluate(() => window.testHelper.checkCategoryAccordion('main'));
    expect(accordionState.isVisible).toBe(false);
  });

  test('検索拡張パネルを開くことができる', async ({ page }) => {
    const searchInput = page.locator('.prj-header-search-input').first();
    await searchInput.click();
    const searchState = await page.evaluate(() => window.testHelper.checkSearchExtended());
    expect(searchState.isActive).toBe(true);
  });

  test('コメント返信ボタンからコメントモーダルを開くことができる', async ({ page }) => {
    const commentButton = page.locator('.prj-comment-accordion-button').first();
    await commentButton.click();
    const commentState = await page.evaluate(() => window.testHelper.checkCommentReply());
    expect(commentState.isActive).toBe(false);
  });
});