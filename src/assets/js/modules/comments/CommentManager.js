/**
 * コメント機能全体を管理するマネージャークラス
 * 各コメント関連の機能（フォームの表示/非表示、入力機能の制御、返信アコーディオンボタン、オプションボタン、もっと見るボタン）を統合的に管理します
 */
import { CommentFormVisibilityManager } from './CommentFormVisibilityManager';
import { CommentInputManager } from './CommentInputManager';
import { CommentAccordion } from './CommentAccordion';
import { CommentMoreOption } from './CommentMoreOption';
import { CommentMoreView } from './CommentMoreView';


export class CommentManager {
  /**
   * コメントマネージャーのコンストラクタ
   * 各機能のインスタンスを初期化します
   */
  constructor() {
    // 各機能のインスタンスを作成
    this.formVisibilityManager = new CommentFormVisibilityManager(); // フォームの表示/非表示管理
    this.replyManager = new CommentInputManager();    // 入力機能の制御
    this.accordion = new CommentAccordion();          // 返信アコーディオンボタン
    this.moreOption = new CommentMoreOption();        // コメントオプション（削除など）の管理
    this.moreView = new CommentMoreView();            // コメントテキストの展開/折りたたみ機能

    this.initialize();
  }

  /**
   * コメント機能全体を初期化
   * コメントエリアの存在確認後、各機能の初期化を実行します
   */
  initialize() {
    try {
      // コメントエリアの存在確認
      const commentArea = document.querySelector('.prj-article-content-comments');

      if (!commentArea) {
        return;
      }

      // 各機能の初期化を実行
      this.formVisibilityManager.initialize(); // フォームの表示/非表示管理の初期化
      this.replyManager.initialize();     // 入力機能の初期化
      this.accordion.initialize();        // 返信アコーディオンボタンの初期化
      this.moreOption.initialize();       // コメントオプション（削除など）の初期化
      this.moreView.initialize();         // コメントテキストの展開/折りたたみ機能の初期化
    } catch (error) {
      console.error('コメント機能の初期化でエラーが発生しました:', error);
    }
  }
}