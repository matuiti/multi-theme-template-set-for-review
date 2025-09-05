// 責務：アコーディオンヘッダー要素の検索
export class AccordionHeaderFinder {
  static findHeaders() {
    return document.querySelectorAll(
      '.prj-modal-menu-component .prj-filter-menu-accordion-header[data-toggle], ' +
      '.prj-modal-category-component .prj-filter-menu-accordion-header[data-toggle]'
    );
  }
}