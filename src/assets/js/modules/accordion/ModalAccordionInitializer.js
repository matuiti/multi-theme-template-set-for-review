/**
 * モーダルアコーディオンの初期化を担当するクラス
 * アコーディオンヘッダーにクリックイベントを設定し、開閉機能を実装します
 */
import { AccordionHeaderFinder } from './AccordionHeaderFinder';
import { AccordionContentFinder } from './AccordionContentFinder';
import { AccordionToggleHandler } from './AccordionToggleHandler';
// 責務：アコーディオンヘッダーの初期化
export class ModalAccordionInitializer {
  // 初期化が既に実行されたかどうかを追跡するプライベート静的フィールド
  static #executed = false;

  /**
   * モーダルアコーディオンの初期化を実行するメソッド
   * @returns {Object} 初期化の結果を表すオブジェクト
   *   - status: 初期化の状態（'already_executed' | 'no_headers_found' | 'success'）
   *   - total: 処理対象のヘッダー総数
   *   - initialized: 初期化されたヘッダー数
   *   - skipped: スキップされたヘッダー数
   */
  static initialize() {
    // 既に初期化済みの場合は処理をスキップ
    if (this.#executed) {
      return { status: 'already_executed' };
    }

    // ページ内のすべてのアコーディオンヘッダーを検索
    const allHeaders = AccordionHeaderFinder.findHeaders();

    // ヘッダーが見つからない場合は処理を中断
    if (allHeaders.length === 0) {
      return { status: 'no_headers_found' };
    }

    let initializedCount = 0;  // 初期化したヘッダーの数
    let skipCount = 0;   // スキップしたヘッダーの数

    // 各ヘッダーに対して処理を実行
    allHeaders.forEach((header) => {
      // 既に処理済みのヘッダーはスキップ
      if (header.hasAttribute('data-reliable-initialized')) {
        skipCount++;
        return;
      }

      // ヘッダーのdata-toggle属性を取得（対応するコンテンツの識別子）
      const dataToggle = header.getAttribute('data-toggle');

      // クリックイベントハンドラを定義
      const clickHandler = (e) => {
        // クリックされたヘッダーに対応するコンテンツを検索
        const content = AccordionContentFinder.findContent(header, dataToggle);
        // アコーディオンの開閉処理を実行
        AccordionToggleHandler.handleToggle(header, content, dataToggle);
      };

      // ヘッダーにクリックイベントリスナーを追加
      header.addEventListener('click', clickHandler, { capture: false, passive: false });
      // 処理済みフラグを設定
      header.setAttribute('data-reliable-initialized', 'true');
      initializedCount++;
    });

    // 初期化完了フラグを設定
    this.#executed = true;
  }
}