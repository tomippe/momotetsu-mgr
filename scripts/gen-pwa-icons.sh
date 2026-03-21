#!/bin/bash
# public/apple-touch-icon.png を元に PWA 用アイコンを生成する。
# cover 相当: 短辺が 512（または 192）になるよう拡大し、正方形で中央トリミング。
# macOS の角丸アイコン内では、全面に柄が乗る見え方になる。
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/apple-touch-icon.png"
cd "$ROOT/public"
magick "$SRC" -filter Lanczos -resize 512x512^ -gravity center -extent 512x512 pwa-512.png
magick "$SRC" -filter Lanczos -resize 192x192^ -gravity center -extent 192x192 pwa-192.png
echo "  ✓ pwa-512.png, pwa-192.png を更新しました"
