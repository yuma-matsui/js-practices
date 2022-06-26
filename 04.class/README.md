# Memo App

Terminal上で簡易メモを管理する個人向けアプリケーション。

# Features
メモの保存・一覧表示・個別詳細表示・削除が可能。

# DEMO
- メモの保存と一覧表示
[Gyazo](https://i.gyazo.com/dbde8f456541fe6b028e5cacd2b21178.mp4)

- メモの個別詳細表示
[Gyazo](https://gyazo.com/694e29c302ee9e37bdbc4a9d3781186d)

- メモの削除
[Gyazo](https://gyazo.com/c9f178c37fdedfa02303033ddd8cdd83)

# Requirement
* npm eslint 8.18.0
* npm enquirer 2.3.6
* npm sqlite3 5.0.8

# Usage
Please just command git clone

# Author
* 作成者:yum
* 所属:fjord boot camp

# テーブル設計
| カラム名 | 型      | 制約                       |
| -------- | ------- | -------------------------- |
| id       | INTEGER | PRIMARY KEY, AUTOINCREMENT |
| memo     | TEXT    |                            |
