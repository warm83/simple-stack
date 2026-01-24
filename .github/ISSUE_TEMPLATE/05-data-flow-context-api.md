---
name: "5. 学習: データフロー(Context/API)"
about: "Context + API呼び出しによるCRUDの流れ理解"
title: "5. [学習] データフロー(Context/API)"
labels: ["learning", "curriculum"]
---

## 目標
- tasksデータがどこから来てどう更新されるかを説明できる。

## 確認ファイル
- `src/context/TasksProvider.tsx`
- `src/context/TasksContext.ts`
- `src/context/useTasks.ts`
- `src/api/tasks.ts`

## 理解ポイント
- fetch → state更新の流れ
- add/update/removeがAPIにつながる仕組み
