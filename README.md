# TypeORM Query Practices

## ER 図

今回対象にするデータベース構造は以下になる。

![](sample.drawio.svg)

- Many-to-Many
  - ユーザーは複数のグループに所属できる
  - グループには複数のユーザーが存在している
- One-to-Many
  - ユーザーは記事を投稿できる

実験を行いたい場合は下記のコマンドを実行する。

```bash
# クエリを実行したい
npm run start

# マイグレーションファイルを生成したい
npm run migrate:generate <name>

# マイグレーションファイルをDBに適用したい
npm run migrate:run

# データベースの初期データを挿入したい
npm run init:db
```

## 暗黙的な多対多関係の表現方法

多対多関係を表現する場合には、`@ManyToMany` アノテーションと `@JoinTable` アノテーションを使用する。

これでそれぞれの主キーに該当するカラムをもとに交差テーブルが作成される。なお両方のエンティティに `@ManyToMany` アノテーションを付与すると、暗黙的な交差テーブルが２種類作成されてしまう（主キーの順番が異なるのみ）。

```ts
@Entity()
export class UserImplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}

@Entity()
export class GroupImplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserImplicit)
  users: UserImplicit[];
}
```

上記の場合に構築されるデータベースは以下である。

- group_implicit
- group_implicit_users_user_implicit
- user_implicit

もしもこの交差テーブルのテーブル名や、紐づけるカラム名を指定したい場合は以下のように指定すればいい。

```ts
@JoinTable({
    // テーブル名を指定する
    name; "users_groups",
    joinColumn: {
        name: "user_id",
        referenceColumnName: "id",
    }
})
```

## 明示的な多対多関係の表現方法

明示的な多対多関係を作成する場合には、明示的に交差テーブルのエンティティを作成する必要がある。

```ts
@Entity()
export class UserExplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany((type) => UserGroupExplicit, (userGroup) => userGroup.user)
  userGroups: UserGroupExplicit[];
}

@Entity()
export class GroupExplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => UserGroupExplicit, (userGroup) => userGroup.group)
  userGroups: UserGroupExplicit[];
}

@Entity()
export class UserGroupExplicit {
  @ManyToOne((type) => UserExplicit, (user) => user.userGroups, {
    primary: true,
  })
  user: UserExplicit;

  @ManyToOne((type) => GroupExplicit, (group) => group.userGroups, {
    primary: true,
  })
  group: GroupExplicit;

  @Column()
  authenticationType: string;
}
```

交差テーブルにアノテーションを付与する場合には、`primary` フラグを設定しておくことで主キーであることを明示的に伝えておく必要がある。

これで以下のようなテーブルが作成される。

- user_explicit
  - ID が主キー
- group_explicit
  - ID が主キー
- user_group_explicit
  - ユーザー ID とグループ ID の複合主キー

参考資料

- [Many-to-Many with custom fields #1224](https://github.com/typeorm/typeorm/issues/1224#issuecomment-348426495)

## 1 体多関係の表現方法

1 対多の関係性を表現する場合には、以下のように `@OneToMany` と `@ManyToOne` アノテーションを使用すればいい。

```ts
@Entity()
export class UserImplicit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserImplicit, (user) => user.posts)
  user: UserImplicit;
}
```

この場合はユーザーテーブル自体には変更は発生しないが、Post テーブルにユーザーテーブルとの紐付けが発生する。

- Post
  - `userId: Integer`
  - 外部キーで接続する
