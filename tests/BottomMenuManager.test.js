import { test, expect } from '@playwright/test';
import { BottomMenuManager } from '../src/assets/js/modules/bottom-menu/BottomMenuManager';

test.describe('BottomMenuManager', () => {
  let bottomMenuManager;

  test.beforeEach(async ({ page }) => {
    // テスト用のHTMLをページに注入
    await page.setContent(`
      <div class="prj-bottom-menu-component">
        <button class="prj-bottom-menu-footer-button-filter"></button>
        <button class="prj-bottom-menu-footer-button-stats"></button>
        <button class="prj-bottom-menu-footer-button-account"></button>
        
        <div class="prj-bottom-menu-filter-section"></div>
        <div class="prj-bottom-menu-stats-section"></div>
        <div class="prj-bottom-menu-account-section"></div>
        
        <div class="prj-bottom-menu-body"></div>
        <div class="prj-bottom-menu-overlay"></div>
      </div>
    `);

    // BottomMenuManagerのインスタンスを作成
    bottomMenuManager = new BottomMenuManager();
  });

  test('コンポーネントが存在しない場合、コンソールに警告が表示される', async ({ page }) => {
    // コンポーネントを削除
    await page.evaluate(() => {
      document.querySelector('.prj-bottom-menu-component').remove();
    });

    // コンソールの警告を監視
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'warning') {
        consoleMessages.push(msg.text());
      }
    });

    // 新しいインスタンスを作成
    await page.evaluate(() => {
      new BottomMenuManager();
    });

    expect(consoleMessages).toContain('ボトムメニューコンポーネントが見つかりません');
  });

  test('必要な要素が正しく取得できている', async ({ page }) => {
    const elements = await page.evaluate(() => {
      const manager = new BottomMenuManager();
      return {
        filterButton: !!manager.filterButton,
        statsButton: !!manager.statsButton,
        accountButton: !!manager.accountButton,
        filterSection: !!manager.filterSection,
        statsSection: !!manager.statsSection,
        accountSection: !!manager.accountSection,
        menuBody: !!manager.menuBody,
        overlay: !!manager.overlay
      };
    });

    expect(elements.filterButton).toBeTruthy();
    expect(elements.statsButton).toBeTruthy();
    expect(elements.accountButton).toBeTruthy();
    expect(elements.filterSection).toBeTruthy();
    expect(elements.statsSection).toBeTruthy();
    expect(elements.accountSection).toBeTruthy();
    expect(elements.menuBody).toBeTruthy();
    expect(elements.overlay).toBeTruthy();
  });

  test('フィルターボタンをクリックすると、対応するセクションがアクティブになる', async ({ page }) => {
    await page.click('.prj-bottom-menu-footer-button-filter');

    const classes = await page.evaluate(() => ({
      filterSection: document.querySelector('.prj-bottom-menu-filter-section').classList.contains('active'),
      filterButton: document.querySelector('.prj-bottom-menu-footer-button-filter').classList.contains('active'),
      menuBody: document.querySelector('.prj-bottom-menu-body').classList.contains('active'),
      overlay: document.querySelector('.prj-bottom-menu-overlay').classList.contains('active'),
      overflow: document.documentElement.style.overflow
    }));

    expect(classes.filterSection).toBe(true);
    expect(classes.filterButton).toBe(true);
    expect(classes.menuBody).toBe(true);
    expect(classes.overlay).toBe(true);
    expect(classes.overflow).toBe('hidden');
  });

  test('アクティブなボタンを再度クリックすると、すべてのアクティブ状態が解除される', async ({ page }) => {
    // まずフィルターボタンをクリック
    await page.click('.prj-bottom-menu-footer-button-filter');
    // 同じボタンを再度クリック
    await page.click('.prj-bottom-menu-footer-button-filter');

    const classes = await page.evaluate(() => ({
      filterSection: document.querySelector('.prj-bottom-menu-filter-section').classList.contains('active'),
      filterButton: document.querySelector('.prj-bottom-menu-footer-button-filter').classList.contains('active'),
      menuBody: document.querySelector('.prj-bottom-menu-body').classList.contains('active'),
      overlay: document.querySelector('.prj-bottom-menu-overlay').classList.contains('active'),
      overflow: document.documentElement.style.overflow
    }));

    expect(classes.filterSection).toBe(false);
    expect(classes.filterButton).toBe(false);
    expect(classes.menuBody).toBe(false);
    expect(classes.overlay).toBe(false);
    expect(classes.overflow).toBe('');
  });

  test('異なるボタンをクリックすると、前のセクションが非アクティブになり新しいセクションがアクティブになる', async ({ page }) => {
    // まずフィルターボタンをクリック
    await page.click('.prj-bottom-menu-footer-button-filter');
    // 次に統計ボタンをクリック
    await page.click('.prj-bottom-menu-footer-button-stats');

    const classes = await page.evaluate(() => ({
      filterSection: document.querySelector('.prj-bottom-menu-filter-section').classList.contains('active'),
      statsSection: document.querySelector('.prj-bottom-menu-stats-section').classList.contains('active'),
      filterButton: document.querySelector('.prj-bottom-menu-footer-button-filter').classList.contains('active'),
      statsButton: document.querySelector('.prj-bottom-menu-footer-button-stats').classList.contains('active')
    }));

    expect(classes.filterSection).toBe(false);
    expect(classes.statsSection).toBe(true);
    expect(classes.filterButton).toBe(false);
    expect(classes.statsButton).toBe(true);
  });

  test('オーバーレイをクリックすると、すべてのアクティブ状態が解除される', async ({ page }) => {
    // まずフィルターボタンをクリック
    await page.click('.prj-bottom-menu-footer-button-filter');
    // オーバーレイをクリック
    await page.click('.prj-bottom-menu-overlay');

    const classes = await page.evaluate(() => ({
      filterSection: document.querySelector('.prj-bottom-menu-filter-section').classList.contains('active'),
      filterButton: document.querySelector('.prj-bottom-menu-footer-button-filter').classList.contains('active'),
      menuBody: document.querySelector('.prj-bottom-menu-body').classList.contains('active'),
      overlay: document.querySelector('.prj-bottom-menu-overlay').classList.contains('active'),
      overflow: document.documentElement.style.overflow
    }));

    expect(classes.filterSection).toBe(false);
    expect(classes.filterButton).toBe(false);
    expect(classes.menuBody).toBe(false);
    expect(classes.overlay).toBe(false);
    expect(classes.overflow).toBe('');
  });

  test('ボタンクリック時にデフォルトの動作が防止される', async ({ page }) => {
    // クリックイベントのデフォルト動作が防止されたかどうかを確認
    const isDefaultPrevented = await page.evaluate(() => {
      let defaultPrevented = false;
      document.querySelector('.prj-bottom-menu-footer-button-filter').addEventListener('click', (e) => {
        defaultPrevented = e.defaultPrevented;
      });
      document.querySelector('.prj-bottom-menu-footer-button-filter').click();
      return defaultPrevented;
    });

    expect(isDefaultPrevented).toBe(true);
  });
});