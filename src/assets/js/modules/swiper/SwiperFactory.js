import Swiper from 'swiper';
import { commonOptions, breakpoints } from './SwiperConfig.js';

// Swiperのインスタンスを生成するクラス
// デザインパターンでいう「Factory Method パターン」の実装例
export class SwiperFactory {
  // 横スクロールスライダー（ナビゲーションボタン付き）
  static createHorizontalSwiper(selector, options = {}) {
    return new Swiper(selector, {
      ...commonOptions,
      slidesPerView: 'auto',
      spaceBetween: 16,
      grabCursor: true,
      navigation: {
        nextEl: `${selector} .section-swiper-button-next`,
        prevEl: `${selector} .section-swiper-button-prev`,
      },
      ...options
    });
  }
  // カード型単一画像スライダー
  static createCardSwiper(selector, options = {}) {
    return new Swiper(selector, {
      ...commonOptions,
      slidesPerView: 1,
      spaceBetween: 2,
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: `${selector} .swiper-button-next`,
        prevEl: `${selector} .swiper-button-prev`,
      },
      ...options
    });
  };
  // 3枚のうち中央のカードが拡大表示されるカルーセル
  static createCenteredSwiper(selector, options = {}) {
    return new Swiper(selector, {
      ...commonOptions,
      slidesPerView: 1.5,
      centeredSlides: true,
      spaceBetween: 20,
      navigation: {
        nextEl: `${selector} .section-swiper-button-next`,
        prevEl: `${selector} .section-swiper-button-prev`,
      },
      breakpoints: {

        [breakpoints.md]: {
          slidesPerView: 3,
          spaceBetween: 48,
        }
      },
      ...options
    });
  };
  // ページネーション制御スライダー
  static createPaginationSwiper(selector, options = {}) {
    const swiper = new Swiper(selector, {
      ...commonOptions,
      slidesPerView: 1,
      pagination: {
        el: `${selector} .swiper-pagination`,
        clickable: true,
      },
      ...options
    });
    // 一時停止ボタンの機能を追加
    const pauseButton = document.querySelector(`${selector} .pause-button`);
    if (pauseButton) {
      pauseButton.addEventListener('click', () => {
        if (pauseButton.classList.contains('played')) {
          swiper.autoplay.stop();
          pauseButton.classList.remove('played');
          pauseButton.innerHTML = '<span class="material-symbols-outlined icon-play-lg" aria-hidden="true">play_arrow</span>';
        } else {
          swiper.autoplay.start();
          pauseButton.classList.add('played');
          pauseButton.innerHTML = '<span class="material-symbols-outlined icon-pause-lg" aria-hidden="true">pause</span>';
        }
      });
    }

    return swiper;
  };
  // 縦方向スクロールスライダー
  static createVerticalSwiper(selector, options = {}) {
    return new Swiper(selector, {
      ...commonOptions,
      slidesPerView: 'auto',
      direction: 'vertical',
      spaceBetween: 16,
      grabCursor: true,
      navigation: {
        nextEl: `${selector} .section-swiper-button-next`,
        prevEl: `${selector} .section-swiper-button-prev`,
      },
      ...options
    });
  };
  // ナビゲーションボタンなし（→有りに対応）横スクロール
  static createSimpleSwiper(selector, options = {}) {
    return new Swiper(selector, {
      ...commonOptions,
      slidesPerView: 'auto',
      grabCursor: true,
      navigation: {
        nextEl: `${selector} .section-swiper-button-next`,
        prevEl: `${selector} .section-swiper-button-prev`,
      },
      breakpoints: {
        [breakpoints.sm]: {
          spaceBetween: 24,
        },
        [breakpoints.md]: {
          spaceBetween: 32,
        }
      },
      ...options
    });
  };
}