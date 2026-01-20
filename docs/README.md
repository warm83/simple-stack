# 開発メモ

## 目的
- タスク管理ボードのUI/UXとAPI連携の学習・検証
- ローカルAPI + Supabase を使ったCRUDの確認

## 環境
- Node/Yarn: Node 20+ / Yarn 1.22.x
- 起動方法:
  - フロント: `yarn dev`
  - API: `yarn dev:api`

## 構成
- フォルダ構成:
  - `src/pages`: 画面
  - `src/components`: UI部品
  - `src/context`: 状態/データ取得
  - `src/api`: APIクライアント
  - `server`: ローカルAPI（Express）
- 主要ファイル:
  - `src/pages/task/task.tsx`: 一覧画面
  - `src/pages/task/detail.tsx`: 詳細画面
  - `src/context/TasksProvider.tsx`: 取得・CRUD
  - `server/index.ts`: APIサーバー

## 開発ルール
- ブランチ/コミット規則:
  - `feature/*`もしくは`issue_*` で進行1
  - コミットは日本語の短い要約
- コードスタイル:
  - TypeScript/React
  - MUIの`sx`は各ページの`*.styles.ts`へ分離

## 作業ログ
- API連携（Supabase）を追加
- ローカルAPIをTypeScript化

## 参考リンク
- Supabase: https://supabase.com/
- MUI: https://mui.com/
