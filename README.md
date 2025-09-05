# 📁 概要

このリポジトリは、過去に携わったプロジェクトの技術的アプローチや構造を再現したものです。
実際の業務内容は秘密保持契約により公開できないため、類似の課題設定と技術スタックを用いて再構築しています。

---

## 🚀 技術スタック

- **言語**: HTML5, CSS3, JavaScript (ES6+)
- **ビルドツール**: [Vite](https://vitejs.dev/) `v6.3.5`
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) `v3.2.1`, [Sass](https://sass-lang.com/) `v1.89.1`, [PostCSS](https://postcss.org/) `v8.4.35`, [Autoprefixer](https://github.com/postcss/autoprefixer) `v10.4.17`
- **テンプレートエンジン**: [vite-plugin-ejs](https://www.npmjs.com/package/vite-plugin-ejs) `v1.7.0`
- **UIコンポーネント**: [Swiper](https://swiperjs.com/) `v11.0.6`
- **テスト**: [Playwright](https://playwright.dev/) `@playwright/test v1.52.0`

---

## 🔧 主な機能
- 要件水準（デジタル庁のガイドブックを基準にする等）を満たすSEO対策とアクセシビリティ施策
- HTMLのセマンティックマークアップやCSSによるレスポンシブ対応
- JavaScriptによる動的UIの構築（ES6モジュール対応）
  - ドロワーメニューとカテゴリ選択ボタンから展開するモーダルのアコーディオンメニュー
  - 検索拡張パネル
  - スマホ専用ボトムメニュー
  - 詳細ページ下部コメントエリアの各UI
- Swiperを用いた多種多数のスライダーUIの実装
- Tailwind CSS + Sass による柔軟なスタイリング
- EJSテンプレート、JavaScriptモジュール、Sassのパーシャル機能によるファイル分割管理により、プロジェクト中のミスの抑制とのちの保守性を考慮
- PlaywrightによるE2Eテストの導入
- PostCSS + Autoprefixer によるCSS最適化
- 後続のVue.jsエンジニアさんに引き継ぎするための最適化
  - 後工程でコンポーネント化しやすいように意識したソースコード
  - Viteにより要件に合わせたファイル出力を制御
- （おまけ）:各テーマ・ページを横断的にレビューできるようにポータルページindex.htmlを準備

---

## 🎯 再構築の目的

このコードは、実務で培ったスキル・設計力・実装力を示すために作成されたデモプロジェクトです。
守秘義務を遵守しつつ、技術的な再現を目的として公開しています。

---

## ▶️ 実行方法

```bash
# クローン
git clone https://github.com/matuiti/MultiThemeTemplateSet-forReview.git

# ディレクトリ移動
cd project-name

# パッケージインストール
npm install

# 開発サーバー起動
npm run dev

# ビルドプレビュー
npm run preview