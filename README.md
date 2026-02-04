# タスク管理ボード

React + TypeScript + MUI学習用CRUDプロジェクトです。チーム課題を一覧・追加・編集・削除できるUIを用意しています。

## 主要機能

- 課題の一覧/追加/編集/削除
- 状態フィルター（未着手/進行中/完了）
- デスクトップはテーブル、モバイルはカード表示

## 技術スタック

- React + TypeScript (Vite)
- MUI
- React Router
- Express (ローカルAPI)
- Supabase

## 画面

- `/` 課題一覧
- `/tasks/:id` 課題詳細
- `/login` ログイン（UIのみ）

## セットアップ

```bash
yarn install
```

## 環境変数

`.env` を作成して下記を設定してください。

```bash
VITE_API_BASE_URL=http://localhost:3001
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

テンプレートは `.env.example` にあります。

## 起動方法

フロントエンド:

```bash
yarn dev
```

ローカルAPI:

```bash
yarn dev:api
```

## Vercelデプロイ

- VercelにGitHubリポジトリを接続し、`yarn build`でビルドします。
- APIはVercel Functionsとして`/api`配下で動きます（`api/index.ts`）。

### Vercelの環境変数

```
VITE_API_BASE_URL=/api
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
CORS_ORIGIN=https://<your-vercel-domain>
```

`VITE_API_BASE_URL` を未設定の場合、プロダクションでは `/api` を自動で使用します。

## API

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`
