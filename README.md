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

## 画面

- `/` 課題一覧
- `/tasks/:id` 課題詳細
- `/login` ログイン（UIのみ）

## 使い方

```bash
npm install
npm run dev
```

## メモ

現時点ではデータはフロント側の状態で保持しています。API連携（例: Supabase）に切り替える前提の構成です。
