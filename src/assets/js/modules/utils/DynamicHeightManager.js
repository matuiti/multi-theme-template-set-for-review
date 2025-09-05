/**
 * 要素の高さを動的に調整するマネージャークラス
 *
 * このクラスは以下の責務を持ちます：
 * 1. 基準となる要素（sourceElement）の高さに基づいて、対象要素（targetElement）の高さを自動調整
 * 2. ウィンドウのリサイズや画像の読み込み、Swiperの状態変更などに応じて高さを再計算
 * 3. カスタマイズ可能な調整タイプとオフセット値の提供
 */
export class DynamicHeightManager {
  /**
   * @param {Object} options - 初期化オプション
   * @param {string} options.sourceSelector - 高さの基準となる要素のセレクタ
   * @param {string} options.targetSelector - 高さを調整する対象要素のセレクタ
   * @param {string} [options.sourceContainerSelector] - 基準要素のコンテナのセレクタ（オプション）
   * @param {string} [options.adjustmentType='height'] - 調整タイプ（height, minHeight, maxHeight）
   * @param {number} [options.offset=0] - 追加の調整値（ピクセル単位）
   * @param {string[]} [options.events=['resize', 'load']] - 監視するイベントの配列
   */
  constructor(options) {
    this.sourceElement = document.querySelector(options.sourceSelector);
    this.targetElement = document.querySelector(options.targetSelector);
    this.sourceContainer = options.sourceContainerSelector ?
      document.querySelector(options.sourceContainerSelector) : null;
    this.adjustmentType = options.adjustmentType || 'height';
    this.offset = options.offset || 0;
    this.events = options.events || ['resize', 'load'];

    if (!this.sourceElement || !this.targetElement) {
      console.warn('DynamicHeightManager: Required elements not found');
      return;
    }

    // コンストラクタで自動的に初期化
    this.updateHeight();
    this.attachEventListeners();
  }

  /**
   * 対象要素の高さを更新する
   *
   * 計算方法：
   * 1. 基準要素の高さを取得
   * 2. コンテナの位置を考慮（存在する場合）
   * 3. 対象要素の位置を考慮
   * 4. オフセット値を加算
   */
  updateHeight() {
    const sourceHeight = this.sourceElement.offsetHeight;
    const containerTop = this.sourceContainer ? this.sourceContainer.offsetTop : 0;
    const totalHeight = containerTop + sourceHeight;
    const targetTop = this.targetElement.offsetTop;

    this.targetElement.style[this.adjustmentType] = `${totalHeight - targetTop + this.offset}px`;
  }

  /**
   * 高さの更新をトリガーするイベントリスナーを設定
   *
   * 設定されるイベント：
   * 1. 指定された基本イベント（resize, load等）
   * 2. 基準要素内の画像の読み込み完了
   * 3. Swiperの状態変更（存在する場合）
   */
  attachEventListeners() {
    // 基本イベントの設定
    this.events.forEach(event => {
      window.addEventListener(event, () => this.updateHeight());
    });

    // 画像の読み込みイベントの設定
    const images = this.sourceElement.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('load', () => this.updateHeight());
    });

    // Swiperのイベント設定（Swiperが存在する場合）
    if (this.sourceElement.swiper) {
      this.sourceElement.swiper.on('slideChange', () => this.updateHeight());
      this.sourceElement.swiper.on('resize', () => this.updateHeight());
      this.sourceElement.swiper.on('observerUpdate', () => this.updateHeight());
    }
  }
}

// 使用例
// new DynamicHeightManager({
//   sourceSelector: '.content',
//   targetSelector: '.sidebar',
//   adjustmentType: 'minHeight',
//   offset: 20, // 20pxの余白を追加
//   events: ['resize', 'load', 'scroll']
// });