/**
 * コメントの詳細オプション（削除など）を管理するクラス
 * オプションメニューの表示/非表示の制御と、クリックイベントの処理を行います
 */
export class CommentMoreOption {
  /**
   * コンストラクタ
   * 現在アクティブなオプションコンポーネントを追跡するためのプロパティを初期化
   */
  constructor() {
    this.activeComponent = null;  // 現在開いているオプションメニューのコンポーネント
  }

  /**
   * オプション機能の初期化
   * コメントエリア内のオプションボタンにイベントリスナーを設定し、
   * 外部クリックの監視を開始します
   */
  initialize() {
    try {
      // コメントエリアの存在確認
      const commentArea = document.querySelector('.prj-article-content-comments');
      if (!commentArea) return;

      // オプションボタンの取得と初期化
      const moreOptionButtons = commentArea.querySelectorAll('.prj-more-option-more-button');
      if (moreOptionButtons.length === 0) return;

      // 各ボタンにイベントリスナーを設定
      moreOptionButtons.forEach((button, index) => {
        this.initializeMoreOptionButton(button, index);
      });

      // 外部クリックの監視を開始
      document.addEventListener('click', this.handleOutsideClick.bind(this));
    } catch (error) {
      console.error('more-option機能の初期化でエラーが発生しました:', error);
    }
  }

  /**
   * 個別のオプションボタンの初期化
   * @param {HTMLElement} button - オプションボタンの要素
   * @param {number} index - ボタンのインデックス（デバッグ用）
   */
  initializeMoreOptionButton(button, index) {
    try {
      button.addEventListener('click', (event) => {
        event.stopPropagation();  // イベントの伝播を防止
        this.handleMoreOptionClick(button, index);
      });
    } catch (error) {
      console.error(`more-optionボタン${index + 1}の初期化でエラーが発生しました:`, error);
    }
  }

  /**
   * オプションボタンクリック時の処理
   * @param {HTMLElement} button - クリックされたボタン要素
   * @param {number} index - ボタンのインデックス
   */
  handleMoreOptionClick(button, index) {
    const moreOptionComponent = button.closest('.prj-more-option-component');
    if (!moreOptionComponent) return;

    // 同じコンポーネントがクリックされた場合は閉じる
    if (this.activeComponent === moreOptionComponent) {
      this.closeMoreOption(moreOptionComponent);
    } else {
      // 別のコンポーネントがクリックされた場合は、現在開いているものを閉じて新しいものを開く
      if (this.activeComponent) {
        this.closeMoreOption(this.activeComponent);
      }
      this.openMoreOption(moreOptionComponent);
    }
  }

  /**
   * オプションメニューを開く
   * @param {HTMLElement} component - 開くオプションコンポーネント
   */
  openMoreOption(component) {
    component.classList.add('active');
    // 自分のコメントの場合は特別なスタイルを適用
    const parentCommentComponent = component.closest('.prj-comment-component');
    if (parentCommentComponent && parentCommentComponent.classList.contains('is-self')) {
      component.classList.add('is-self');
    }
    this.activeComponent = component;
  }

  /**
   * オプションメニューを閉じる
   * @param {HTMLElement} component - 閉じるオプションコンポーネント
   */
  closeMoreOption(component) {
    component.classList.remove('active');
    component.classList.remove('is-self');
    this.activeComponent = null;
  }

  /**
   * 外部クリック時の処理
   * オプションメニューの外側がクリックされた場合にメニューを閉じます
   * @param {Event} event - クリックイベント
   */
  handleOutsideClick(event) {
    if (this.activeComponent && !this.activeComponent.contains(event.target)) {
      this.closeMoreOption(this.activeComponent);
    }
  }
}