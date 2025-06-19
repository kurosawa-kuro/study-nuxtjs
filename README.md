# Study Nuxt.js - 管理画面アプリケーション

## 📋 プロジェクト概要

このプロジェクトは、Nuxt.jsを使用した管理画面アプリケーションの学習・開発用リポジトリです。マイクロサービスアーキテクチャを採用し、モダンなWeb開発技術スタックを実践的に学ぶことを目的としています。

## 🎯 プロジェクトゴール

- **アプリケーションテーマ**: 管理画面システム
- **学習目標**: 
  - Nuxt.js 3の実践的な活用
  - マイクロサービスアーキテクチャの理解
  - クラウドネイティブ開発の習得
  - セキュアな認証・認可システムの構築

## 🏗️ アーキテクチャ

### システム構成
- **アーキテクチャパターン**: マイクロサービスアーキテクチャ
- **フロントエンド**: Nuxt.js 3（SSR/SSG対応）
- **バックエンド**: Nuxt.js サーバールート（API Routes）
- **認証・認可**: Keycloak
- **データベース**: PostgreSQL（Amazon RDS）
- **メッセージング**: RabbitMQ
- **インフラ**: AWS（CloudFormation）

## 🛠️ 技術スタック

### フロントエンド
- **フレームワーク**: Nuxt.js 3
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS（推奨）
- **状態管理**: Pinia
- **UIライブラリ**: Nuxt UI（推奨）

### バックエンド
- **ランタイム**: Node.js
- **言語**: TypeScript
- **API**: Nuxt.js サーバールート
- **認証**: Keycloak
- **ORM**: Prisma（推奨）

### インフラストラクチャ
- **クラウドプロバイダー**: AWS
- **IaC**: CloudFormation
- **データベース**: Amazon RDS PostgreSQL
- **メッセージング**: RabbitMQ
- **コンテナ**: Docker

## 🚀 セットアップ

### 前提条件
- Node.js 18.x以上
- Docker & Docker Compose
- AWS CLI（本番環境用）
- PostgreSQL（ローカル開発用）

### ローカル開発環境の構築

1. **リポジトリのクローン**
```bash
git clone <repository-url>
cd study-nuxtjs
```

2. **依存関係のインストール**
```bash
npm install
```

3. **環境変数の設定**
```bash
cp .env.example .env
# .envファイルを編集して必要な環境変数を設定
```

4. **データベースのセットアップ**
```bash
# PostgreSQLの起動（Docker使用）
docker-compose up -d postgres

# データベースマイグレーション
npm run db:migrate
```

5. **開発サーバーの起動**
```bash
npm run dev
```

## 📁 プロジェクト構造

```
study-nuxtjs/
├── components/          # Vue.jsコンポーネント
├── pages/              # ページコンポーネント
├── server/             # サーバールート（API）
├── middleware/         # Nuxt.jsミドルウェア
├── plugins/            # Nuxt.jsプラグイン
├── stores/             # Piniaストア
├── types/              # TypeScript型定義
├── utils/              # ユーティリティ関数
├── prisma/             # データベーススキーマ
├── docker/             # Docker設定
├── infrastructure/     # CloudFormationテンプレート
└── docs/               # プロジェクトドキュメント
```

## 🔧 開発ガイドライン

### コーディング規約
- **言語**: TypeScriptを必須とする
- **命名規則**: camelCase（変数・関数）、PascalCase（クラス・コンポーネント）
- **インポート順序**: 外部ライブラリ → 内部モジュール → 相対パス

### コミット規約
```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル修正
refactor: リファクタリング
test: テスト追加・修正
chore: その他の変更
```

## 🧪 テスト

### テスト実行
```bash
# ユニットテスト
npm run test

# E2Eテスト
npm run test:e2e

# テストカバレッジ
npm run test:coverage
```

## 🚀 デプロイメント

### 開発環境
```bash
npm run build
npm run preview
```

### 本番環境
```bash
# AWS CloudFormationでデプロイ
aws cloudformation deploy \
  --template-file infrastructure/template.yaml \
  --stack-name study-nuxtjs-prod \
  --capabilities CAPABILITY_IAM
```

## 📚 参考資料

- [Nuxt.js 3 Documentation](https://nuxt.com/docs)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [AWS CloudFormation Documentation](https://docs.aws.amazon.com/cloudformation/)
- [Prisma Documentation](https://www.prisma.io/docs)

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは学習目的で作成されています。

## 📞 サポート

質問や問題がある場合は、Issueを作成してください。
