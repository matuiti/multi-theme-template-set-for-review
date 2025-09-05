/**
 * 検索フォーム拡張パネルの表示制御クラス
 */
export class SearchExtendedPanelManager {
  constructor() {
    this.headerComponent = document.querySelector('.prj-header-component');
    if (!this.headerComponent) return;

    this.searchInput = this.headerComponent.querySelector('.prj-header-search-input');
    this.searchButtons = this.headerComponent.querySelectorAll('.prj-header-search-button');
    this.extendedPanel = this.headerComponent.querySelector('.prj-header-search-extended');
    this.closeButton = this.headerComponent.querySelector('.prj-header-search-extended-close');

    if (!this.extendedPanel) return;

    this.maxMobileWidth = 599; // spの最大画面幅

    this.initialize();
  }

  /**
   * 画面幅がモバイルサイズかどうかを判定
   */
  isMobileWidth() {
    return window.innerWidth <= this.maxMobileWidth;
  }

  /**
   * 拡張パネルを表示
   */
  showExtendedPanel() {
    this.extendedPanel.classList.add('active');

    if (this.isMobileWidth()) {
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * 拡張パネルを非表示
   */
  hideExtendedPanel() {
    this.extendedPanel.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * 拡張パネルの表示状態をトグル
   */
  toggleExtendedPanel() {
    if (this.extendedPanel.classList.contains('active')) {
      this.hideExtendedPanel();
    } else {
      this.showExtendedPanel();
    }
  }

  /**
   * パネル範囲外クリック時の処理
   */
  handleOutsideClick(e) {
    if (!e.target.closest('.prj-header-search') &&
      !e.target.closest('.prj-header-search-extended') &&
      !e.target.closest('.prj-header-search-button')) {
      this.hideExtendedPanel();
    }
  }

  /**
   * リサイズ時の処理
   */
  handleResize() {
    if (this.extendedPanel.classList.contains('active')) {
      if (this.isMobileWidth()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  /**
   * イベントリスナーの設定
   */
  setupEventListeners() {
    if (this.searchInput) {
      this.searchInput.addEventListener('click', () => this.toggleExtendedPanel());
    }

    this.searchButtons.forEach(button => {
      button.addEventListener('click', () => this.toggleExtendedPanel());
    });

    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.hideExtendedPanel());
    }

    document.addEventListener('click', (e) => this.handleOutsideClick(e));
    window.addEventListener('resize', () => this.handleResize());
  }

  /**
   * 初期化
   */
  initialize() {
    this.setupEventListeners();
  }
}