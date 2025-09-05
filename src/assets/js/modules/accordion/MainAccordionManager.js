/**
 * メインアコーディオンの処理クラス
 */
export class MainAccordionManager {
  constructor() {
    this.initializedElements = new Set();
    this.namespace = 'main-accordion';
    this.initialize();
  }

  initialize() {
    const sectionSelectors = [
      '.category-search-section',
      '.account-search-section'
    ];

    // 各セクションごとにアコーディオンを初期化
    sectionSelectors.forEach(sectionSelector => {
      const sections = document.querySelectorAll(sectionSelector);
      sections.forEach(section => {
        this.initializeAccordionInSection(section);
      });
    });
  }

  initializeAccordionInSection(section) {
    // 指定されたセクションごとのアコーディオンヘッダーを取得
    const toggleElements = section.querySelectorAll('.prj-filter-menu-accordion-header[data-toggle]');
    toggleElements.forEach((toggle) => {
      const toggleValue = toggle.getAttribute('data-toggle');
      if (!toggleValue) {
        console.warn('data-toggle属性に値が設定されていません:', toggle);
        return;
      }
      // 重複初期化防止
      const elementId = `${section.className}-${toggleValue}`;
      if (this.initializedElements.has(elementId)) {
        return;
      }

      // 既存のイベントリスナーを確実に削除するためにクローン作成して置き換え
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);
      // アコーディオン管理用の識別マークを追加
      newToggle.setAttribute('data-main-accordion-managed', 'true');
      // クリックイベントを設定
      newToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // 同セクションのdata-content要素を検索
        const content = section.querySelector(`[data-content="${toggleValue}"]`);

        if (!content) {
          console.warn(`セクション内でdata-content="${toggleValue}"に対応する要素が見つかりません`);
          return;
        }

        // hiddenクラスをトグルして表示/非表示を切り替え
        const wasHidden = content.classList.contains('hidden');
        content.classList.toggle('hidden');

        // アイコンの回転処理（data-icon要素が存在する場合のみ）
        const icon = newToggle.querySelector('[data-icon]');
        if (icon) {
          icon.classList.toggle('rotate-180');
        }

        // アクティブクラスの追加/削除
        newToggle.classList.toggle('active');

        // セクション識別のためのID生成（セクションのクラス名を使用）
        const sectionId = section.className.split(' ')[0] || 'unknown-section';
        const uniqueToggleValue = `${sectionId}-${toggleValue}`;

        // カスタムイベントを発火
        newToggle.dispatchEvent(new CustomEvent('accordionToggle', {
          detail: {
            toggleValue: toggleValue,
            uniqueToggleValue: uniqueToggleValue,
            sectionId: sectionId,
            isOpen: !content.classList.contains('hidden'),
            section: section
          }
        }));
      }, { capture: false, passive: false });

      this.initializedElements.add(elementId);
    });
  }

  // 状態取得
  getStatus() {
    return {
      initializedElements: Array.from(this.initializedElements),
      managedElementsCount: document.querySelectorAll('[data-main-accordion-managed]').length
    };
  }
}