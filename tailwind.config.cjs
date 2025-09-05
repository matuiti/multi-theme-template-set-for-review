/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Tailwindのクラスを検出する範囲を指定
    './src/**/*.js',
    './src/**/*.html',
    './src/**/*.ejs'
  ],
  theme: {
    // 既存設定を上書きする
    screens: {
      // ブレイクポイント_モバイルファースト
      sm: '600px',//tablet
      md: '1024px',//pc1
      lg: '1440px',//pc2
      xl: '1920px',//pc3
    },

    // 新たに追加する
    extend: {
      fontSize: {// text-xsのように使う
        'xs': ['0.75rem', { lineHeight: '1rem' }],       // 12px, line-height: 16px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px, line-height: 20px
        'base': ['1rem', { lineHeight: '1.5rem' }],      // 16px, line-height: 24px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px, line-height: 28px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],    // 20px, line-height: 28px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px, line-height: 32px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px, line-height: 36px
      },
      letterSpacing: {
        'sm': 'var(--letter-spacing-sm)',  // Newセクション「もっと見る」ボタン等
        'md': 'var(--letter-spacing-md)',  // 検索バー内のテキスト
        'lg': 'var(--letter-spacing-lg)',   // SPのボトムメニューアイコン下テキスト
      },
      colors: {
        'primary': 'var(--theme-primary)',
        'text': {
          'primary': 'var(--text-primary)',
          'theme': 'var(--theme-text-primary)',
        },
        'bg': {
          'primary': 'var(--theme-bg-primary)',
          'theme-1': 'var(--theme-bg-1)',
        },


        // カテゴリータグカラー
        'category': {
          1: 'var(--theme-category-1)',//薄茶
          2: 'var(--theme-category-2)',//青系
          3: 'var(--theme-category-3)',//ベージュ系
          4: 'var(--theme-category-4)',//グレー系
          5: 'var(--theme-category-5)',//赤系
          6: 'var(--theme-category-6)',//グレー系（濃いめ）
        },

        // ランキングカラー
        'ranking': {
          1: 'var(--theme-ranking-1)',
          2: 'var(--theme-ranking-2)',
          3: 'var(--theme-ranking-3)',
          4: 'var(--theme-ranking-4)',
          5: 'var(--theme-ranking-5)',
          6: 'var(--theme-ranking-6)',
          7: 'var(--theme-ranking-7)',
          8: 'var(--theme-ranking-8)',
          9: 'var(--theme-ranking-9)',
          10: 'var(--theme-ranking-10)',
        },
      },
      boxShadow: {
        'theme': 'var(--theme-box-shadow)',
        'header': 'var(--box-shadow-header)',
        'search': 'var(--box-shadow-search)',
      },
      maxWidth: {
        'content-width-xs': 'var(--content-width-xs)',
        'content-width-sm': 'var(--content-width-sm)',
        'content-width-md': 'var(--content-width-md)',
        'content-width-lg': 'var(--content-width-lg)',
        'content-width-xl': 'var(--content-width-xl)',
      },
    },
  },
  plugins: [],
}