import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Controller, Keyboard, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Swiperにモジュールを登録
Swiper.use([Navigation, Pagination, EffectFade, Controller, Keyboard, A11y, Autoplay]);
// ブレイクポイントを定義
const breakpoints = {
  xs: 0,       // ~599px（スマホ向け）
  sm: 600,     // 600px~1023px（小型タブレット向け）
  md: 1024,    // 1024px~1439px（小型デスクトップ向け）
  lg: 1440,    // 1440px~1919px（標準デスクトップ向け）
  xl: 1920,    // 1920px~（大型ディスプレイ向け）
};

// 共通設定（デフォルト設定）
const commonOptions = {
  loop: true,
  a11y: {
    prevSlideMessage: '前のスライドへ',
    nextSlideMessage: '次のスライドへ',
    firstSlideMessage: '最初のスライドです',
    lastSlideMessage: '最後のスライドです',
  }
};

export { breakpoints, commonOptions };