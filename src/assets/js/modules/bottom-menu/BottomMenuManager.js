export class BottomMenuManager {
  constructor() {
    this.bottomMenuComponent = document.querySelector('.prj-bottom-menu-component');
    this.activeButton = null;

    // 各ボタン要素
    this.filterButton = null;
    this.statsButton = null;
    this.accountButton = null;

    // 各セクション要素
    this.filterSection = null;
    this.statsSection = null;
    this.accountSection = null;

    // 共通要素
    this.menuBody = null;
    this.overlay = null;

    this.initialize();
  }

  initialize() {
    if (!this.bottomMenuComponent) {
      console.warn('ボトムメニューコンポーネントが見つかりません');
      return;
    }

    this.initializeElements();
    this.attachEventListeners();
  }

  initializeElements() {
    // 各ボタン要素を取得
    this.filterButton = this.bottomMenuComponent.querySelector('.prj-bottom-menu-footer-button-filter');
    this.statsButton = this.bottomMenuComponent.querySelector('.prj-bottom-menu-footer-button-stats');
    this.accountButton = this.bottomMenuComponent.querySelector('.prj-bottom-menu-footer-button-account');

    // 各セクション要素を取得
    this.filterSection = this.bottomMenuComponent.querySelector('.prj-bottom-menu-filter-section');
    this.statsSection = this.bottomMenuComponent.querySelector('.prj-bottom-menu-stats-section');
    this.accountSection = this.bottomMenuComponent.querySelector('.prj-bottom-menu-account-section');

    // 共通要素を取得
    this.menuBody = this.bottomMenuComponent.querySelector('.prj-bottom-menu-body');
    this.overlay = this.bottomMenuComponent.querySelector('.prj-bottom-menu-overlay');
  }

  attachEventListeners() {
    if (this.filterButton) {
      this.filterButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleButtonClick(this.filterButton, this.filterSection);
      });
    }

    if (this.statsButton) {
      this.statsButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleButtonClick(this.statsButton, this.statsSection);
      });
    }

    if (this.accountButton) {
      this.accountButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleButtonClick(this.accountButton, this.accountSection);
      });
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.removeAllActiveClasses());
    }
  }

  removeAllActiveClasses() {
    // 各セクションからactiveクラスを削除
    [this.filterSection, this.statsSection, this.accountSection].forEach(section => {
      if (section) section.classList.remove('active');
    });

    // 各ボタンからactiveクラスを削除
    [this.filterButton, this.statsButton, this.accountButton].forEach(button => {
      if (button) button.classList.remove('active');
    });

    // 共通要素からactiveクラスを削除
    if (this.menuBody) this.menuBody.classList.remove('active');
    if (this.overlay) this.overlay.classList.remove('active');

    // 背景スクロールを有効化
    document.documentElement.style.overflow = '';

    // アクティブボタンをリセット
    this.activeButton = null;
  }

  activateSection(targetSection, button) {
    // まず全てのactiveクラスを削除
    this.removeAllActiveClasses();

    // 指定されたセクションにactiveクラスを追加
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // クリックされたボタンにactiveクラスを追加
    if (button) {
      button.classList.add('active');
    }

    // 共通要素にactiveクラスを追加
    if (this.menuBody) this.menuBody.classList.add('active');
    if (this.overlay) this.overlay.classList.add('active');

    // 背景スクロールを無効化
    document.documentElement.style.overflow = 'hidden';

    // 現在のアクティブボタンを記録
    this.activeButton = button;
  }

  handleButtonClick(button, targetSection) {
    // 既に同じボタンがアクティブな場合は全て閉じる
    if (this.activeButton === button) {
      this.removeAllActiveClasses();
    } else {
      // 異なるボタンまたは初回クリックの場合は該当セクションを開く
      this.activateSection(targetSection, button);
    }
  }
}