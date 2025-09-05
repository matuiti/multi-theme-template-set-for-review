/**
 * モーダルメニューの初期化と制御
 */
export function initializeMenuModal() {
  // モーダルメニュー
  const hamburgerButton = document.querySelector('.prj-header-hamburger-button');
  const modalMenu = document.querySelector('.prj-modal-menu-component');
  const closeButton = document.querySelector('.prj-modal-menu-close');
  const overlay = document.querySelector('.prj-modal-menu-overlay');

  // 必要な要素が存在するか確認
  if (!hamburgerButton || !modalMenu || !closeButton || !overlay) {
    console.error('モーダルメニューの要素が見つかりません');
    return;
  }

  // モーダルを開く関数
  const openModal = () => {
    modalMenu.classList.remove('hidden');
    hamburgerButton.setAttribute('aria-expanded', 'true');
    // より確実にスクロールを無効化
    document.documentElement.style.overflow = 'hidden';
  };

  // モーダルを閉じる関数
  const closeModal = () => {
    modalMenu.classList.add('hidden');
    hamburgerButton.setAttribute('aria-expanded', 'false');
    // スクロール機能を復元
    document.documentElement.style.overflow = '';
  };

  // イベントリスナー設定
  hamburgerButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
}