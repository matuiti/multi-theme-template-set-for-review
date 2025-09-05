// テスト用のヘルパー関数を定義
window.testHelper = {
  // 要素の状態を確認する汎用関数
  checkElementState: (selector, options = {}) => {
    const {
      hiddenClass = 'hidden',
      activeClass = 'active',
      parentSelector = null,
      attributeName = null,
      attributeValue = null
    } = options;

    const context = parentSelector ? document.querySelector(parentSelector) : document;
    const element = context.querySelector(selector);
    const targetElement = attributeName && attributeValue
      ? element?.getAttribute(attributeName) === attributeValue ? element : null
      : element;

    return {
      isVisible: targetElement ? !targetElement.classList.contains(hiddenClass) : false,
      isActive: targetElement ? targetElement.classList.contains(activeClass) : false,
      element: targetElement
    };
  },

  // よく使うパターンのショートカット関数
  // モーダルメニュー
  checkModal: () => window.testHelper.checkElementState('.prj-modal-menu-component'),
  checkAccordion: (type) => window.testHelper.checkElementState(
    `.prj-filter-menu-accordion-body[data-content="${type}"]`,
    {
      parentSelector: '.prj-modal-menu-component .category-search-section',
      attributeName: 'data-content',
      attributeValue: type
    }
  ),
  // カテゴリーモーダルメニュー
  checkCategoryModal: () => window.testHelper.checkElementState('.prj-modal-category-component'),
  checkCategoryAccordion: (type) => window.testHelper.checkElementState(
    `.prj-filter-menu-accordion-body[data-content="${type}"]`,
    {
      parentSelector: '.prj-modal-category-component .category-search-section',
      attributeName: 'data-content',
      attributeValue: type
    }
  ),
  // 検索拡張パネル
  checkSearchExtended: () => window.testHelper.checkElementState('.prj-header-search-extended'),
  // コメント返信ボタン
  checkCommentReply: () => window.testHelper.checkElementState('.prj-comment-accordion-button'),
  // ボトムメニュー
  checkBottomMenu: () => window.testHelper.checkElementState('.prj-bottom-menu-body'),
  checkBottomMenuAccordion: (type) => window.testHelper.checkElementState(
    `.prj-filter-menu-accordion-body[data-content="${type}"]`,
    {
      parentSelector: '.prj-bottom-menu-component .category-search-section',
      attributeName: 'data-content',
      attributeValue: type
    }
  ),

};