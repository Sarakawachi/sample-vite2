## sample-vite2

Vite + React をベースにしたフロントエンドプロジェクトです。Supabase を利用したバックエンド連携、Jest + Testing Library によるユニットテスト、Firebase Hosting へのデプロイを想定しています。

### 主な技術スタック

- **Build/Dev**: Vite
- **UI**: React 19
- **Auth/DB**: Supabase (`@supabase/supabase-js`)
- **Test**: Jest 30, Testing Library
- **Lint**: ESLint 9
- **Hosting**: Firebase Hosting

## セットアップ

1. 依存関係をインストール

```bash
npm install
```

2. 環境変数を設定（プロジェクト直下に `.env` を作成）

```bash
VITE_SUPABASE_URL=SupabaseプロジェクトURL
VITE_SUPABASE_KEY=Supabaseキー
```

補足:

- `vite.config.js` で `dotenv` を読み込み、`VITE_SUPABASE_URL` と `VITE_SUPABASE_KEY` をビルド時に埋め込みます。
- Supabase のプロジェクト作成と API キー取得は公式ドキュメントを参照してください。

## 開発

- 開発サーバー起動

```bash
npm run dev
```

- Lint 実行

```bash
npm run lint
```

## ビルド & プレビュー

- 本番ビルド

```bash
npm run build
```

- ビルド結果のローカルプレビュー

```bash
npm run preview
```

## テスト

- ユニットテスト実行（Jest + @testing-library）

```bash
npm test
```

## デプロイ（Firebase Hosting）

前提: Firebase CLI がインストール済みで `firebase login` 済み。

- 直接デプロイ

```bash
npm run build
firebase deploy
```

- Makefile 経由

```bash
make deploy
```


## プロジェクト構成（抜粋）

```
src/
  App.jsx
  main.jsx
  utils/
    supabase.js        # Supabase クライアント初期化
  tests/
    *.spec.js          # Jest テスト
```

