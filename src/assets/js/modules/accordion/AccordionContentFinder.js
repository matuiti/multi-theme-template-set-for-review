// 責務：アコーディオンコンテンツ要素の検索
export class AccordionContentFinder {
  static findContent(header, dataToggle) {
    // 方法1: 親セクション内で検索
    const parentSection = header.closest('.category-search-section, .account-search-section');
    if (parentSection) {
      const content = parentSection.querySelector(`[data-content="${dataToggle}"]`);
      if (content) return content;
    }

    // 方法2: 親コンテナ内で検索
    const parentContainer = header.closest('.prj-modal-menu-component, .prj-modal-category-component, .prj-bottom-menu-component');
    if (parentContainer) {
      const content = parentContainer.querySelector(`[data-content="${dataToggle}"]`);
      if (content) return content;
    }

    // 方法3: グローバル検索
    return document.querySelector(`[data-content="${dataToggle}"]`);
  }
}