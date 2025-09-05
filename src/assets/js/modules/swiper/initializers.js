import { SwiperFactory } from './SwiperFactory.js';
import { breakpoints } from './SwiperConfig.js';

// MV関連のスライダー初期化
const initializeMvSliders = () => {
  // MV背景スライダー
  SwiperFactory.createPaginationSwiper('.mv-bg-swiper', {
    speed: 500,
    autoplay: { delay: 5500, disableOnInteraction: false },
    centeredSlides: true,
  });

  // Theme-aMVスライダー
  SwiperFactory.createHorizontalSwiper('.theme-a-mv-swiper', {
    speed: 400,
    autoplay: { delay: 4000, disableOnInteraction: false },
    slidesPerView: 1.8,
    centeredSlides: true,
    initialSlide: 2,
    spaceBetween: 20,
    breakpoints: {
      [breakpoints.sm]: { slidesPerView: 'auto', initialSlide: 3, spaceBetween: 20 },
      [breakpoints.md]: { slidesPerView: 'auto', initialSlide: 5, spaceBetween: 20 },
      [breakpoints.lg]: { slidesPerView: 'auto', initialSlide: 5, spaceBetween: 20 },
      [breakpoints.xl]: { slidesPerView: 'auto', initialSlide: 5, spaceBetween: 20 }
    }
  });

  // Theme-bMVスライダー
  SwiperFactory.createHorizontalSwiper('.theme-b-mv-swiper', {
    speed: 400,
    autoplay: { delay: 4000, disableOnInteraction: false },
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 0,
    initialSlide: 0,
    breakpoints: {
      [breakpoints.md]: { slidesPerView: 1.4 },
      [breakpoints.lg]: { slidesPerView: 1.8 },
      [breakpoints.xl]: { slidesPerView: 2.6 }
    }
  });

  // theme-dMVスライダー
  SwiperFactory.createHorizontalSwiper('.theme-d-mv-swiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    initialSlide: 4,
    spaceBetween: 12.73,
    breakpoints: {
      [breakpoints.sm]: { spaceBetween: 20 },
      [breakpoints.md]: { spaceBetween: 20 },
      [breakpoints.lg]: { spaceBetween: 20 },
      [breakpoints.xl]: { spaceBetween: 20 }
    }
  });
};

// コミュニティ関連のスライダー初期化
const initializeCommunitySliders = () => {
  // Theme-bコミュニティスライダー
  SwiperFactory.createSimpleSwiper('.theme-b-community-swiper', {
    speed: 600,
    autoplay: { delay: 3000, disableOnInteraction: false },
    observer: true,
    observeParents: true,
    resizeObserver: true,
    loopAdditionalSlides: 10,
    loop: true,
    initialSlide: 0,
    centeredSlides: true,
    slidesPerView: 10,
    spaceBetween: 20,
    breakpoints: {
      [breakpoints.sm]: { spaceBetween: 40 },
      [breakpoints.md]: { spaceBetween: 40 },
      [breakpoints.lg]: { spaceBetween: 40 },
      [breakpoints.xl]: { spaceBetween: 40 }
    }
  });

  // Theme-cコミュニティスライダー
  SwiperFactory.createSimpleSwiper('.theme-c-community-swiper', {
    speed: 600,
    autoplay: { delay: 3000, disableOnInteraction: false },
    loop: true,
    initialSlide: 4,
    slidesPerView: 'auto',
    spaceBetween: 20
  });
};

// Theme-c関連のスライダー初期化
const initializeCurationSliders = () => {
  // Theme-cトップスライダー
  SwiperFactory.createPaginationSwiper('.theme-c-top-swiper', {
    speed: 400,
    autoplay: { delay: 4000, disableOnInteraction: false },
    spaceBetween: 2
  });

  // Theme-cトップ水平スライダー
  SwiperFactory.createHorizontalSwiper('.theme-c-top-horizontal-swiper', {
    centeredSlides: true,
    initialSlide: 3,
    spaceBetween: 0
  });

  // Theme-cトップ垂直スライダー
  SwiperFactory.createVerticalSwiper('.theme-c-top-vertical-swiper', {
    loop: true,
    slidesPerView: 5,
    initialSlide: 0,
    spaceBetween: 12
  });
};

// その他のスライダー初期化
const initializeOtherSliders = () => {
  // カードスライダー
  SwiperFactory.createCardSwiper('.card-swiper', {
    keyboard: { enabled: true, onlyInViewport: true }
  });

  // Theme-aランキングスライダー
  SwiperFactory.createHorizontalSwiper('.theme-a-ranking-swiper', {
    loop: false,
    initialSlide: 0,
    spaceBetween: 28
  });

  // 記事詳細レコメンドスライダー
  SwiperFactory.createHorizontalSwiper('.article-detail-recommend-swiper', {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    initialSlide: 1,
    spaceBetween: 0,
    breakpoints: {
      [breakpoints.sm]: { slidesPerView: 'auto', initialSlide: 1, spaceBetween: 0 },
      [breakpoints.md]: { slidesPerView: 'auto', initialSlide: 1, spaceBetween: 20 },
      [breakpoints.lg]: { slidesPerView: 'auto', initialSlide: 1, spaceBetween: 28 },
      [breakpoints.xl]: { slidesPerView: 'auto', initialSlide: 1, spaceBetween: 28 }
    }
  });
};

export const initializeAllSliders = () => {
  initializeMvSliders();
  initializeCommunitySliders();
  initializeCurationSliders();
  initializeOtherSliders();
};