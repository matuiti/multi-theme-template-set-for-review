import { SearchExtendedPanelManager } from './modules/search/SearchExtendedPanelManager';
import { BottomMenuManager } from './modules/bottom-menu/BottomMenuManager';
import { initializeAllSliders } from './modules/swiper/initializers.js';
import { DynamicHeightManager } from './modules/utils/DynamicHeightManager';
import { initializeCompleteAccordionSystem } from './modules/accordion/initializeAccordion';
import { initializeMenuModal } from './modules/accordion/menuModal';
import { initializeCategoryModal } from './modules/accordion/categoryModal';
import { ModalAccordionInitializer } from './modules/accordion/ModalAccordionInitializer';
import { CommentManager } from './modules/comments/CommentManager';
import { SwitchButtonManager } from './modules/utils/SwitchButtonManager';
import { ToggleButtonManager } from './modules/utils/ToggleButtonManager';
import { RankingNumberHoverMove } from './modules/utils/RankingNumberHoverMove';

// 共通スタイル
import '../styles/main.scss'
// 最後に拡張スタイルを読み込む
window.onload = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/assets/extend.css';
  document.head.appendChild(link);
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new SearchExtendedPanelManager();// 検索フォーム拡張パネルの初期化
  new BottomMenuManager();// ボトムメニューの初期化
  initializeCompleteAccordionSystem();// アコーディオンの初期化
  initializeMenuModal();// モーダルメニューの初期化
  initializeCategoryModal();// モーダルカテゴリの初期化
  ModalAccordionInitializer.initialize();// モーダル内のアコーディオンヘッダーの初期化
  new CommentManager();// コメント機能の初期化
  initializeAllSliders();// スライダーの初期化
  new SwitchButtonManager();// スイッチボタンの初期化
  new ToggleButtonManager();// トグルボタンの初期化
  new RankingNumberHoverMove();// ランキング番号のホバー時の移動の初期化
  new DynamicHeightManager({// Theme-bMVセクションの高さを動的に調整
    sourceSelector: '.theme-b-mv-swiper',
    targetSelector: '.mv',
    sourceContainerSelector: '.absolute',
    adjustmentType: 'height',
    events: ['resize', 'load']
  });
});