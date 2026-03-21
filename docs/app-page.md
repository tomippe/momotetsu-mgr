# MOMOTETSU Card Manager — apps.tomippe.jp 紹介ページ

## URL

- 紹介ページ: https://apps.tomippe.jp/momotetsu-mgr/
- アプリ本体: https://apps.tomippe.jp/momotetsu-mgr/run/

### PWA（manifest）

- **scope / id** は **`/momotetsu-mgr/run/`** に限定（`public/manifest.webmanifest`）。  
  `scope` を `/momotetsu-mgr/` 全体にすると、WordPress の紹介ページでも「インストール」扱いになりブラウザにインストールアイコンが出るため。

## WordPress

- 投稿タイプ: `app`
- 投稿 ID: `.env` の `WP_APP_POST_ID`（REST: `GET /wp-json/wp/v2/app/{id}?context=edit`）

## 画像・メディア（再アップロード時のメモ）

| 用途 | ソースファイル | 備考 |
|------|----------------|------|
| スクリーンショット（app-ss01） | `IMG_4097.PNG`（リポジトリ直下） | 1170×2532。表示幅 **app-ss01width: 400**（ACF）。**app-ss01radius**: オン（角丸） |
| KV 背景（app-kvbg） | `public/bg-sky.png` | 1024×576 |
| アイコン（app-icon） | `momo-illust6.png` | 紹介ページ用。メディア ID は WordPress 側で管理 |

## ACF 設定（KV）

- **app-keycolor**: `#3eaef7`（KV オーバーレイと揃え）
- **app-ss01width**: `400`
- **app-kvbgaddcss**（指定どおり明示設定）:

```
background-repeat: no-repeat;
background-position: center;
background-size: cover;
background-color: #3eaef7;
background-blend-mode: multiply;
```

青（`#3eaef7`）を重ねて **multiply（乗算）** でブレンド。

## キャッチ・ボタン

- **app-cp**: 2 行（`\r\n`）— POUCHES 等と同様の改行キャッチ  
  例: `周遊カードの枚数と効果を\r\n対戦中にサッと管理`
- **app-webdesc**: `HTML5, CSS3 Required<br>日本語`（yticapo / bg-css-gen / POUCHES の Web 行に倣い、共通ルールの「対応言語」は 2 行目に記載）
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
