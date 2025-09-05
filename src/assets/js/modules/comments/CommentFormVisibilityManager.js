/**
 * コメントフォームの表示/非表示を管理するクラス
 * 返信ボタン、キャンセルボタン、フォーム外クリックの処理を担当
 */
export class CommentFormVisibilityManager {
  constructor() {
    this.activeForm = null;  // 現在表示中のフォーム
  }

  /**
   * フォームの表示/非表示制御の初期化
   * 各ボタンのクリックイベントとフォーム外クリックの監視を設定
   */
  initialize() {
    try {
      // 返信ボタンのクリックイベント
      document.addEventListener('click', this.handleReplyButtonClick.bind(this));
      // キャンセルボタンのクリックイベント
      document.addEventListener('click', this.handleCancelButtonClick.bind(this));
      // フォーム外クリックのイベント
      document.addEventListener('click', this.handleOutsideClick.bind(this));
    } catch (error) {
      console.error('コメントフォームの表示制御の初期化でエラーが発生しました:', error);
    }
  }

  /**
   * 返信ボタンクリック時の処理
   * @param {Event} e - クリックイベント
   */
  handleReplyButtonClick(e) {
    if (e.target.closest('.prj-comment-reply-button')) {
      const replyButton = e.target.closest('.prj-comment-reply-button');
      const commentTextBox = replyButton.closest('.prj-comment-text-box');
      if (commentTextBox) {
        this.showForm(commentTextBox);
      }
    }
  }

  /**
   * キャンセルボタンクリック時の処理
   * @param {Event} e - クリックイベント
   */
  handleCancelButtonClick(e) {
    if (e.target.closest('.prj-comment-form-cancel-button')) {
      const cancelButton = e.target.closest('.prj-comment-form-cancel-button');
      const commentTextBox = cancelButton.closest('.prj-comment-text-box');
      if (commentTextBox) {
        this.hideForm(commentTextBox);
      }
    }
  }

  /**
   * フォーム外クリック時の処理
   * @param {Event} event - クリックイベント
   */
  handleOutsideClick(event) {
    if (this.activeForm && !this.activeForm.contains(event.target)) {
      this.hideForm(this.activeForm);
    }
  }

  /**
   * フォームを表示状態にする
   * @param {HTMLElement} form - 表示するフォーム要素
   */
  showForm(form) {
    if (this.activeForm && this.activeForm !== form) {
      this.hideForm(this.activeForm);
    }
    form.classList.add('active');
    this.activeForm = form;
  }

  /**
   * フォームを非表示状態にする
   * @param {HTMLElement} form - 非表示にするフォーム要素
   */
  hideForm(form) {
    form.classList.remove('active');
    this.activeForm = null;
  }
}