#!/bin/bash

# APIテスト実行スクリプト
echo "🚀 Starting API tests..."

# 依存関係のインストール確認
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# テスト実行（サーバーは自動起動）
echo "🧪 Running API tests..."
npm run test:api

# カバレッジレポート生成
echo "📊 Generating coverage report..."
npm run test:coverage

echo "✅ Tests completed!" 