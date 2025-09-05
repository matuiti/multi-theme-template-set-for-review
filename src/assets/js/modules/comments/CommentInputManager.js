/**
 * コメント入力の状態管理クラス
 * テキストエリアの入力監視と送信ボタンの制御を担当
 *
 * 主な機能：
 * - テキストエリアの入力状態の監視
 * - 送信ボタンの有効/無効状態の制御
 * - 入力フォームの初期化とイベントリスナーの設定
 */
export class CommentInputManager {
  /**
   * コメント入力フォームの初期化
   * 各フォームのテキストエリアと送信ボタンを取得し、
   * 入力状態の監視と送信ボタンの制御を設定します
   */
  initialize() {
    try {
      // すべてのコメントフォームを取得
      const commentForms = document.querySelectorAll('.prj-comment-form-component');

      // 各フォームに対して初期化処理を実行
      commentForms.forEach(form => {
        // テキストエリアと送信ボタンの要素を取得
        const textarea = form.querySelector('textarea[name="comment"]');
        const submitButton = form.querySelector('.prj-comment-form-submit-button');

        // 必要な要素が存在しない場合はスキップ
        if (!textarea || !submitButton) return;

        // 送信ボタンクリック時の遷移を抑制（デフォルトの挙動を無効化）
        submitButton.addEventListener('click', (e) => e.preventDefault());

        // 初期状態の設定
        this.updateSubmitButtonState(textarea, submitButton);

        // 入力状態の変更を監視
        textarea.addEventListener('input', () => {
          this.updateSubmitButtonState(textarea, submitButton);
        });
      });
    } catch (error) {
      console.error('コメント入力の初期化でエラーが発生しました:', error);
    }
  }

  /**
   * 送信ボタンの状態を更新
   * テキストエリアの入力状態に応じて送信ボタンの有効/無効を切り替えます
   *
   * @param {HTMLTextAreaElement} textarea - 入力テキストエリア
   * @param {HTMLElement} submitButton - 送信ボタン
   */
  updateSubmitButtonState(textarea, submitButton) {
    // テキストが入力されているかチェック（空白文字を除く）
    const hasText = textarea.value.trim().length > 0;
    // 送信ボタンの有効/無効状態を切り替え
    submitButton.classList.toggle('active', hasText);
  }
}