# MOMOTETSU Card Manager — apps.tomippe.jp 紹介ページ

## URL

- 紹介ページ: https://apps.tomippe.jp/momotetsu-mgr/
- アプリ本体: https://apps.tomippe.jp/momotetsu-mgr/run/

## WordPress

- 投稿タイプ: `app`
- 投稿 ID: `.env` の `WP_APP_POST_ID`（REST: `GET /wp-json/wp/v2/app/{id}?context=edit`）

## 画像・メディア（再アップロード時のメモ）

| 用途 | ソースファイル | 備考 |
|------|----------------|------|
| スクリーンショット（app-ss01） | `IMG_4097.PNG`（リポジトリ直下） | 1170×2532。差し替え時はメディアを再アップして ACF を更新 |
| KV 背景（app-kvbg） | `public/bg-sky.png` | 1024×576 |
| アイコン（app-icon） | `public/pwa-512.png` | 512×512 |

## ACF 設定（KV）

- **app-keycolor**: `#7DD3FC`
- **app-kvbgaddcss**（指定どおり明示設定）:

```
background-repeat: no-repeat;
background-position: center;
background-size: cover;
background-color: #7DD3FC;
background-blend-mode: hard-light;
```

青（`#7DD3FC`）を重ねて **hard-light** でブレンド。キー色と揃えている。

## キャッチ・ボタン

- **app-cp**: 周遊カードの枚数と効果を、対戦中にサッと管理
- **app-webdesc**: `Webブラウザ（PWA）<br>日本語`
- **app-weburl**: `https://apps.tomippe.jp/momotetsu-mgr/run/`
- **platform**: `["web"]`

## バージョン履歴（app-versions）

初回のみ紹介ページ作成日でテーブル追加済み。以後はユーザー指示時のみ更新。

## curl で取得例

```bash
source ~/.wp-env && source .env
curl -s -u "$WP_USER:$WP_APP_PASSWORD" \
  "$WP_SITE_URL/wp-json/wp/v2/app/$WP_APP_POST_ID?context=edit" | jq '.acf | {app-kvbg, app-ss01, app-kvbgaddcss}'
```
