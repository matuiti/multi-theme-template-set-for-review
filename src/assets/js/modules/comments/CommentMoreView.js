/**
 * コメントの「もっと見る/閉じる」機能を管理するクラス
 * コメントテキストが長い場合に、展開/折りたたみを制御します
 */
export class CommentMoreView {
  /**
   * コメントテキストの展開/折りたたみ機能を初期化
   * コメントエリア内の全ての「もっと見る/閉じる」ボタンにイベントリスナーを設定します
   */
  initialize() {
    try {
      // コメントエリア内の「もっと見る」「閉じる」ボタンを全て取得
      const commentArea = document.querySelector('.prj-article-content-comments');

      // コメントエリアが存在しない場合は静かに終了
      if (!commentArea) {
        return;
      }

      // コメントエリア内の全てのテキスト切り替えボタンを取得
      const textToggleButtons = commentArea.querySelectorAll('.prj-comment-more-text-button');

      // ボタンが存在しない場合は静かに終了
      if (textToggleButtons.length === 0) {
        return;
      }

      // 各ボタンにクリックイベントを追加
      textToggleButtons.forEach((button, index) => {
        this.initializeMoreViewButton(button, index);
      });

    } catch (error) {
      console.error('コメントテキスト切り替え機能の初期化で予期しないエラーが発生しました:', error);
    }
  }

  /**
   * 個別の「もっと見る/閉じる」ボタンの初期化
   * @param {HTMLElement} button - 初期化するボタン要素
   * @param {number} index - ボタンのインデックス（ログ出力用）
   */
  initializeMoreViewButton(button, index) {
    try {
      // クリックイベントリスナーを設定
      button.addEventListener('click', () => {
        try {
          // 一番近い親の.prj-comment-text-boxを探す
          const textBox = button.closest('.prj-comment-text-box');

          // 安全性チェック：テキストボックスが見つからない場合は処理を中断
          if (!textBox) {
            return;
          }

          // テキストボックスの展開/折りたたみ状態を切り替え
          textBox.classList.toggle('active');

          // 現在の状態をログ出力（デバッグ用）
          const isActive = textBox.classList.contains('active');

        } catch (error) {
          console.error(`コメントテキスト切り替えボタン${index + 1}のクリック処理でエラー:`, error);
        }
      });
    } catch (error) {
      console.error(`ボタン${index + 1}のイベントリスナー設定でエラー:`, error);
    }
  }
}