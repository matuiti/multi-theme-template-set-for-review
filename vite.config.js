import { resolve } from 'path';  // パス解決用の関数
import { defineConfig } from 'vite';  // Viteの設定を定義する関数
import { ViteEjsPlugin } from 'vite-plugin-ejs'; // EJSを使用するためのプラグイン

// プロジェクトの基本パス設定（__dirnameは当ファイルのあるディレクトリのパスを取得）
const root = resolve(__dirname, 'src');         // ソースコードのルートディレクトリ（src/）
const outDir = resolve(__dirname, 'dist');      // ビルド出力先ディレクトリ（dist/）
const publicDir = resolve(__dirname, 'public'); // 静的ファイルのディレクトリ（public/）

// Viteの設定を定義（command引数で開発時かビルド時かを判断）
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : './', // ベースURLの設定 command === 'serve' は開発サーバー起動時、開発時は'/'（絶対パス）、ビルド時は'./'（相対パス）
  root, // ソース・コードのルートディレクトリ（src/）
  publicDir, // 静的ファイルのディレクトリ（public/）
  // 開発サーバーの設定
  server: {
    port: 3000,  // 開発サーバーのポート番号（http://localhost:3000）
    open: '/index.html'  // 開発サーバー起動時に自動で開くページ
  },
  build: {
    emptyOutDir: true, // ビルド前に出力ディレクトリを空にする
    minify: false, // minifyをtrueにすると、空白や改行、コメントが削除され変数名が短縮される
    sourcemap: true, // ソースマップはビルド後のファイルをデバッグ時に元ソースコードのどこで何が起きているかの確認が可能になる。ミニファイ設定されている際は元の変数名は確認不能。
    outDir, // ビルド出力先ディレクトリ（dist/）
    // Rollupの設定（Viteは内部でRollupを使用してビルド）
    rollupOptions: {
      // エントリーポイントの設定（各HTMLファイル）
      // エントリーポイントはビルド時にファイルを読み込む起点となるファイル。ここで設定したファイルがビルド時に読み込まれ、そのファイルに依存するファイルもビルドされる。
      input: {
        index: resolve(root, 'index.html'),
        themeATop: resolve(root, 'theme-a-top.html'),
        themeBTop: resolve(root, 'theme-b-top.html'),
        themeCTop: resolve(root, 'theme-c-top.html'),
        themeDTop: resolve(root, 'theme-d-top.html'),
        articleList: resolve(root, 'article-list.html'),
        articleDetail: resolve(root, 'article-detail.html'),
      },
      // 出力ファイルの設定
      output: {
        entryFileNames: `assets/js/[name].js`, // エントリーポイント（上記inputで設定したファイル）に紐づくjsファイルが指定位置に出力される
        chunkFileNames: `assets/js/[name].js`, // main.jsが指定位置に出力される
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').at(-1); // ファイルの拡張子を取得
          if (extType === 'css') {
            return `assets/styles/[name].[ext]`; // 指定位置に出力される。また、デフォルトのハッシュ化を無効化している
          }
          return `misc/[name].[ext]`; // それ以外のファイルが指定位置に出力される
        }
      }
    }
  },

  plugins: [
    ViteEjsPlugin()
  ]
}));