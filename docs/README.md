# 開発メモ

## 目的

TEST

- タスク管理ボードの UI/UX と API 連携の学習・検証
- ローカル API + Supabase を使った CRUD の確認

## 環境

- Node/Yarn: Node 20+ / Yarn 1.22.x
- 起動方法:
  - フロント: `yarn dev`
  - API: `yarn dev:api`

## 構成

- `src/app`: Next.js App Router
- `src/views`: 画面 UI コンポーネント本体
- `src/components`: UI 部品
- `src/context`: 状態/データ取得
- `src/api`: API クライアント
- `server`: ローカル API（Express）

## 主要ファイル

- `src/app/page.tsx`: 一覧画面ルート
- `src/app/tasks/[id]/page.tsx`: 詳細画面ルート
- `src/views/task/task.tsx`: 一覧画面 UI
- `src/views/task/detail.tsx`: 詳細画面 UI
- `server/index.ts`: API サーバー
