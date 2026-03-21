#!/bin/bash
set -e

# ===== momotetsu-mgr ビルドスクリプト (Vite + 静的サイト) =====

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

APP_NAME="momotetsu-mgr"
DEV_PORT=5176
DEPLOY_DIR="../apps.tomippe.jp/momotetsu-mgr"

# 共通スクリプト読み込み
source "$SCRIPT_DIR/../build-common/version.sh"
source "$SCRIPT_DIR/../build-common/ftp-upload.sh"
source "$SCRIPT_DIR/../build-common/dev-server.sh"
source "$SCRIPT_DIR/../build-common/git-commit.sh"

# ===== オプション解析 =====
COMMIT_MSG=""
NO_VERUP=false
while [ $# -gt 0 ]; do
    case "$1" in
        -cm) shift; COMMIT_MSG="$1" ;;
        -noverup) NO_VERUP=true ;;
    esac
    shift || true
done

# バージョン読み込み
VERSION=$(version_read)

# package.json のバージョンを更新
if [ -f package.json ]; then
    jq ".version = \"${VERSION}\"" package.json > package.json.tmp && mv package.json.tmp package.json
    echo "  ✓ package.jsonのバージョンを v${VERSION} に更新しました"
fi

echo "🎴 ${APP_NAME} v${VERSION} をビルド中..."

# 開発サーバーの停止
dev_server_stop $DEV_PORT

# ビルド
echo "🔨 ビルドを開始します..."
npm run build

# ビルド結果をデプロイ先にコピー（dist/ → DEPLOY_DIR）
# dist/* だと .htaccess が落ちるため rsync で dotfiles も同期
if [ -d dist ]; then
    mkdir -p "$DEPLOY_DIR"
    rsync -a --delete dist/ "$DEPLOY_DIR/"
    echo "  ✓ ${DEPLOY_DIR}/ にコピーしました（.htaccess 含む）"
fi

# POUCHES と同様: manifest の start_url は /{slug}/run/ 。
# Vite の base は /momotetsu-mgr/ のまま（アセットは /momotetsu-mgr/assets/…）。
# run/ にはルートと同一の index.html を置き、ホーム画面からも同じ JS/CSS を読む。
if [ -f "$DEPLOY_DIR/index.html" ]; then
    mkdir -p "$DEPLOY_DIR/run"
    cp "$DEPLOY_DIR/index.html" "$DEPLOY_DIR/run/index.html"
    echo "  ✓ ${DEPLOY_DIR}/run/index.html を配置（PWA start_url 用・POUCHES と同パターン）"
fi

echo "✅ ビルドが完了しました！"

# FTPアップロード
ftp_upload_dir "$DEPLOY_DIR" "momotetsu-mgr"

# 次回用バージョン保存
if ! $NO_VERUP; then
    echo ""
    echo "📝 次回用バージョンを更新しています..."
    version_save_next "$VERSION"
fi

# Git コミット
git_commit_build "$VERSION" "$COMMIT_MSG"

# 開発サーバーの再起動
dev_server_restart $DEV_PORT "npm run dev"

echo ""
echo "🎉 ${APP_NAME} v${VERSION} — すべて完了しました！"
