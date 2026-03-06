# タスク管理ボード

Next.js (App Router) + TypeScript + MUI 学習用 CRUD プロジェクトです。チーム課題を一覧・追加・編集・削除できる UI を用意しています。

## 主要機能

- 課題の一覧/追加/編集/削除
- 状態フィルター（未着手/進行中/完了）
- デスクトップはテーブル、モバイルはカード表示

## 技術スタック

- Next.js (App Router) + React + TypeScript
- MUI
- Jotai
- Express (ローカル API)
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
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=3001
CORS_ORIGIN=http://localhost:3000
NEXT_PUBLIC_MAINTENANCE_MODE=false
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

## API

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

`NEXT_PUBLIC_API_BASE_URL` を未設定の場合、プロダクションでは `/api` を自動で使用します。

## Prettier

```bash
yarn install
yarn format:check
yarn format  
```
- `yarn format:check`: 変更せずにチェック
- `yarn format`: 実際に適用