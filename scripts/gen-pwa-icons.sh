#!/bin/bash
# public/apple-touch-icon.png を元に PWA 用アイコンを生成する。
# macOS のスクワークル等の角丸マスクは角付近を切るため、
# 絵を一度 512/192 にフィットさせたうえで SAFE_RATIO（既定 0.82）まで縮小し、
# 周囲に余白を付けて「角で葉先が欠けにくい」ようにする。
# 余白の色は画像左上 1px をサンプル（太陽光のベース色に近づける）。
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/apple-touch-icon.png"
cd "$ROOT/public"

SAFE_RATIO="${SAFE_RATIO:-0.82}"

gen_one() {
  local OUT="$1" SIZE="$2"
  local INNER
  INNER=$(python3 -c "import math; print(int(round($SIZE * float('$SAFE_RATIO'))))")
  # 背景色（角の色に合わせる）
  local BG
  BG=$(magick "$SRC" -scale 1x1 -format '#%[hex:p{0,0}]' info:- 2>/dev/null || echo '#F5E6B8')
  magick -size "${SIZE}x${SIZE}" "xc:${BG}" \
    \( "$SRC" -filter Lanczos -resize "${SIZE}x${SIZE}!" -resize "${INNER}x${INNER}!" \) \
    -gravity center -compose over -composite "$OUT"
}

gen_one pwa-512.png 512
gen_one pwa-192.png 192

echo "  ✓ pwa-512.png, pwa-192.png を更新しました (SAFE_RATIO=${SAFE_RATIO})"
