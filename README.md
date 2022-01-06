# TypeORM Query Practices

## ER 図

今回対象にするデータベース構造は以下になる。

![](sample.drawio.svg)

- Many-to-Many
  - ユーザーは複数のグループに所属できる
  - グループには複数のユーザーが存在している
- One-to-Many
  - ユーザーは記事を投稿できる
