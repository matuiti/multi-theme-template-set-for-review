/**
 * カテゴリモーダルの初期化と制御
 */
export function initializeCategoryModal() {
  // カテゴリモーダル
  const categoryButtons = document.querySelectorAll('.prj-button-category-component');
  const categoryModal = document.querySelector('.prj-modal-category-component');
  const categoryCloseButton = document.querySelector('.prj-modal-category-close');
  const categoryCancelButton = document.querySelector('.prj-modal-category-cancel');
  const categoryOverlay = document.querySelector('.prj-modal-category-overlay');

  // カテゴリモーダルの要素確認
  if (categoryButtons.length === 0 || !categoryModal || !categoryCloseButton || !categoryCancelButton || !categoryOverlay) {
    return;
  }

  // カテゴリモーダルを開く関数
  const openCategoryModal = () => {
    categoryModal.classList.remove('hidden');
    // 全てのカテゴリボタンのaria-expandedを更新
    categoryButtons.forEach(button => {
      button.setAttribute('aria-expanded', 'true');
    });
    // より確実にスクロールを無効化
    document.documentElement.style.overflow = 'hidden';
  };

  // カテゴリモーダルを閉じる関数
  const closeCategoryModal = () => {
    categoryModal.classList.add('hidden');
    // 全てのカテゴリボタンのaria-expandedを更新
    categoryButtons.forEach(button => {
      button.setAttribute('aria-expanded', 'false');
    });
    // スクロール機能を復元
    document.documentElement.style.overflow = '';
  };

  // イベントリスナー設定（全てのカテゴリボタンに対して設定）
  categoryButtons.forEach(button => {
    button.addEventListener('click', openCategoryModal);
  });

  categoryCloseButton.addEventListener('click', closeCategoryModal);
  categoryCancelButton.addEventListener('click', closeCategoryModal); // キャンセルボタンでも閉じる
  categoryOverlay.addEventListener('click', closeCategoryModal);
}