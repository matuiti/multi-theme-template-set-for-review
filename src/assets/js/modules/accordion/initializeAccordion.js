import { AccordionCategoryManager } from './AccordionCategoryManager';
import { MainAccordionManager } from './MainAccordionManager';

/**
 * エリア対応型初期化処理
 */
export function initializeCompleteAccordionSystem() {
  // 既存のマネージャーをクリア(重複初期化を防ぐ)
  if (window.accordionManagers) {
    // 既存のaccordionManagerインスタンスがある場合はクリーンアップ
    Object.values(window.accordionManagers).forEach(manager => {
      if (manager && typeof manager.cleanup === 'function') {
        manager.cleanup();
      }
    });
  }
  // アコーディオンマネージャーを初期化（アコーディオンの状態管理を一元化）
  window.accordionManagers = {};
  // 1. メインアコーディオンシステムを初期化（独立して管理）
  const mainAccordion = new MainAccordionManager();
  window.mainAccordionManager = mainAccordion;

  // 2. 各エリアを取得
  const areas = [
    { name: 'modalMenu', element: document.querySelector('.prj-modal-menu-component') },
    { name: 'modalCategory', element: document.querySelector('.prj-modal-category-component') },
    { name: 'bottomMenu', element: document.querySelector('.prj-bottom-menu-component') }
  ];

  // 3. 各エリア内の各セクションにマネージャーを作成
  const accordionSections = ['main', 'sub1', 'sub2', 'account-main', 'account-sub1', 'account-sub2'];

  areas.forEach(area => {
    if (area.element) {
      accordionSections.forEach(sectionId => {
        const managerKey = `${area.name}-${sectionId}`;

        // AccordionCategoryManagerがグローバルに定義されている場合のみ作成
        if (typeof AccordionCategoryManager !== 'undefined') {
          const manager = new AccordionCategoryManager(sectionId, area.element);
          window.accordionManagers[managerKey] = manager;
        } else {
          console.warn('AccordionCategoryManagerが定義されていません');
        }
      });
    }
  });

  // デバッグ用 - ページ全てのアコーディオンを取得して配列でコンソールに表示
  // console.log('初期化されたアコーディオン:', Object.keys(window.accordionManagers));

  // システム全体の状態確認
  window.getAccordionSystemStatus = function () {
    const status = {
      mainAccordion: window.mainAccordionManager ? window.mainAccordionManager.getStatus() : null,
      categoryAccordions: {}
    };

    Object.entries(window.accordionManagers).forEach(([key, manager]) => {
      if (manager && typeof manager.getStatus === 'function') {
        status.categoryAccordions[key] = manager.getStatus();
      } else {
        status.categoryAccordions[key] = 'Status method not available';
      }
    });

    return status;
  };

  // レスポンシブ対応
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const isPC = window.innerWidth >= 1024;
      Object.values(window.accordionManagers).forEach(manager => {
        if (!manager) return;

        if (isPC) {
          // SPからPCに切り替わった場合、SP版の状態をリセット
          if (manager.spComponent) {
            manager.spComponent.querySelectorAll('[data-sp-icon]').forEach((icon) => {
              icon.classList.remove('rotate-180');
            });
            manager.spComponent.querySelectorAll('[data-sp-content]').forEach((content) => {
              content.classList.add('hidden');
            });
            manager.spComponent.querySelectorAll('[data-sp-toggle^="parent-"]').forEach((toggle) => {
              toggle.classList.remove('active');
            });
          }
        } else {
          // PCからSPに切り替わった場合、PC版の状態をリセット
          if (typeof manager.resetState === 'function') {
            manager.resetState();
          }
        }
      });
    }, 300);
  });
}