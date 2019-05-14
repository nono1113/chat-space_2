# README

## users テーブル

| Column | Type | Options                                                 |
| ------ | ---- | ------------------------------------------------------- |
| name   | text | null: false, foreign_key: true, index:true, unique true |

### Association

- has_many :messages
- has_many :members
- has_many :groups, through: :members

## groups テーブル

| Column | Type | Options      |
| ------ | ---- | ------------ |
| name   | text | null: false, |

### Association

- has_many :messages
- has_many :members
- has_many :users, through: :members

## 中間 members テーブル

| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |

### Association

- belongs_to :user
- belongs_to :group

## messages テーブル

| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| body     | text    |                                |
| image    | string  |                                |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |

### Association

- belongs_to :user
- belongs_to :group

  This README would normally document whatever steps are necessary to get the
  application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...
