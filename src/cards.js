/**
 * 桃鉄 カード定義
 * シリーズごとのカードラインナップ（全カード網羅）
 */

export const CARD_CATEGORIES = {
  progress: { label: '進行系', color: '#93c5fd', bg: '#dbeafe' },
  move: { label: '移動系', color: '#86efac', bg: '#dcfce7' },
  attack: { label: '攻撃系', color: '#fca5a5', bg: '#fee2e2' },
  lucky: { label: 'ラッキー系', color: '#fcd34d', bg: '#fef9c3' },
  devil: { label: 'デビル系', color: '#c4b5fd', bg: '#ede9fe' },
  other: { label: 'その他', color: '#d1d5db', bg: '#f3f4f6' },
}

export const SERIES_LIST = [
  { id: 'switch', name: '桃太郎電鉄 昭和 平成 令和も定番！', label: '昭和 平成 令和も定番！', subtitle: '', short: '昭和 平成 令和も定番！', platform: 'Switch', maxHand: 8, maxBank: 16 },
  { id: 'momotetsu2', name: '桃太郎電鉄２ ～あなたの町も きっとある～ 東日本編＋西日本編', label: '２ 東日本編＋西日本編', subtitle: '～あなたの町も きっとある～', short: '２ 東日本編＋西日本編', platform: ['Switch', 'Switch 2'], maxHand: 8, maxBank: 16 },
  { id: 'world', name: '桃太郎電鉄ワールド ～地球は希望でまわってる！～', label: 'ワールド', subtitle: '～地球は希望でまわってる！～', short: 'ワールド', platform: 'Switch', maxHand: 8, maxBank: 16 },
  { id: 'japanplus', name: '桃太郎電鉄JAPAN+', label: 'JAPAN+', subtitle: '', short: 'JAPAN+', platform: 'スマホ', maxHand: 8, maxBank: 16 },
]

export function getSeriesLimits(seriesId) {
  const s = SERIES_LIST.find((s) => s.id === seriesId)
  return { maxHand: s?.maxHand || 8, maxBank: s?.maxBank || 16 }
}

// ============================================================
// Switch版（昭和 平成 令和も定番！）全104種
// ============================================================
const ALL_SWITCH = [
  // --- 進行系 ---
  { id: 'kyuko', name: '急行', category: 'progress', dice: 2, effect: 'サイコロ2個で移動' },
  { id: 'kyuko-syuyu', name: '急行周遊', category: 'progress', dice: 2, min: 5, max: 7, effect: 'サイコロ2個（数回使用可能）' },
  { id: 'tokkyu', name: '特急', category: 'progress', dice: 3, effect: 'サイコロ3個で移動' },
  { id: 'tokkyu-syuyu', name: '特急周遊', category: 'progress', dice: 3, min: 5, max: 7, effect: 'サイコロ3個（数回使用可能）' },
  { id: 'shinkansen', name: '新幹線', category: 'progress', dice: 4, effect: 'サイコロ4個で移動' },
  { id: 'shinkansen-syuyu', name: '新幹線周遊', category: 'progress', dice: 4, min: 5, max: 7, effect: 'サイコロ4個（数回使用可能）' },
  { id: 'nozomi', name: 'のぞみ', category: 'progress', dice: 5, effect: 'サイコロ5個で移動' },
  { id: 'nozomi-syuyu', name: 'のぞみ周遊', category: 'progress', dice: 5, min: 5, max: 7, effect: 'サイコロ5個（数回使用可能）' },
  { id: 'royalex', name: 'ロイヤルEX', category: 'progress', dice: 6, min: 7, max: 11, effect: 'サイコロ6個（数回使用可能）' },
  { id: 'linear', name: 'リニア', category: 'progress', dice: 8, effect: 'サイコロ8個で移動' },
  { id: 'linear-syuyu', name: 'リニア周遊', category: 'progress', dice: 8, min: 9, max: 15, effect: 'サイコロ8個（数回使用可能）' },
  { id: 'special', name: 'スペシャル', category: 'progress', effect: '1〜6マスから好きな数だけ進める' },
  { id: 'specialz', name: 'スペシャルズ', category: 'progress', min: 5, max: 6, effect: '1〜6マスから好きな数（数回使用可能）' },
  { id: 'all6', name: 'オール6', category: 'progress', effect: 'サイコロの目がすべて6になる' },
  // --- 移動系 ---
  { id: 'buttobi', name: 'ぶっとび', category: 'move', effect: 'ランダムな物件駅に移動' },
  { id: 'buttobi-syuyu', name: 'ぶっとび周遊', category: 'move', min: 5, max: 9, effect: 'ランダムな物件駅（数回使用可能）' },
  { id: 'star-tobi', name: '☆飛び', category: 'move', effect: 'カード売り場へ移動' },
  { id: 'star-tobi-syuyu', name: '☆飛び周遊', category: 'move', min: 7, max: 9, effect: 'カード売り場へ移動（数回使用可能）' },
  { id: 'bukken-tobi', name: '物件飛び', category: 'move', effect: '独占可能な物件駅へ移動して購入' },
  { id: 'bukken-tobi-syuyu', name: '物件飛び周遊', category: 'move', min: 5, max: 9, effect: '物件駅へ移動して購入（数回使用可能）' },
  { id: 'goudatsu-tobi', name: '強奪飛び', category: 'move', effect: '他社長の物件駅へ移動し物件を強奪' },
  { id: 'goudatsu-tobi-syuyu', name: '強奪飛び周遊', category: 'move', min: 5, max: 8, effect: '物件駅へ移動し強奪（数回使用可能）' },
  { id: 'chiho', name: '地方へ！', category: 'move', effect: '選んだ地方のランダムな物件駅へ移動' },
  { id: 'chiho-syuyu', name: '地方へ！周遊', category: 'move', min: 5, max: 8, effect: '地方の物件駅へ移動（数回使用可能）' },
  { id: '6daitoshi', name: '6大都市', category: 'move', effect: '札幌/東京/横浜/名古屋/大阪/福岡から選んで移動' },
  { id: 'teleport', name: 'テレポート', category: 'move', effect: '他プレイヤーの1〜3マス隣に移動' },
  { id: 'senzaiichiguu', name: '千載一遇', category: 'move', effect: '目的地の1〜9マス以内に移動' },
  { id: 'kitahe', name: '北へ！', category: 'move', effect: '今いるマスより北の駅にランダム移動' },
  { id: 'satogaeri', name: '里帰り', category: 'move', effect: '発祥地の駅へ移動' },
  { id: 'bookmark', name: 'ブックマーク', category: 'move', effect: '駅で使うとその駅名のカードに変化', editable: true },
  { id: 'moyorinoekide', name: '最寄りの駅で', category: 'move', effect: '一番近い物件駅に移動' },
  { id: 'ashibumi', name: '足踏み', category: 'move', effect: '今いるマスに留まりもう一度効果を受ける' },
  { id: 'chototsu', name: '猪突猛進', category: 'move', effect: '曲がり角まで進み続ける' },
  { id: 'unchi-totsunyuu', name: 'うんち突入', category: 'move', effect: 'うんちを通り抜けることができる' },
  // --- 攻撃系 ---
  { id: 'nottori', name: '乗っ取り', category: 'attack', effect: '物件駅で他社長の物件を1件乗っ取り' },
  { id: 'nottori-houdai', name: '乗っ取り放題', category: 'attack', min: 5, max: 6, effect: '物件を乗っ取り（数回使用可能）' },
  { id: 'katanagari', name: '刀狩り', category: 'attack', effect: '他プレイヤーのカードを1枚奪う' },
  { id: 'gousokkyuu', name: '豪速球', category: 'attack', effect: '他プレイヤー全員のカードをランダムに消滅' },
  { id: 'saihate', name: '最果て', category: 'attack', effect: '他プレイヤーを目的地から遠くに移動' },
  { id: 'summit', name: 'サミット', category: 'attack', effect: '自分のいる場所に他プレイヤー全員を集合' },
  { id: 'syuyu-kinshi', name: '周遊禁止', category: 'attack', effect: '他プレイヤーの周遊カードをランクダウン' },
  { id: 'tondenhei', name: '屯田兵', category: 'attack', effect: '他プレイヤーを北海道に飛ばし1回休み' },
  { id: 'gyuuho', name: '牛歩', category: 'attack', effect: '他プレイヤーを1マスずつしか進めなくする' },
  { id: 'fuuin', name: 'ふういん', category: 'attack', effect: '他プレイヤー全員をカード使用不可に' },
  { id: 'toumin', name: '冬眠', category: 'attack', effect: '他プレイヤー全員を行動不能にする' },
  { id: 'onara', name: 'オナラ', category: 'attack', effect: '他プレイヤーを目的地から15マス遠ざける' },
  { id: 'pittari', name: 'ぴったり', category: 'attack', effect: '他プレイヤーと同じマスに移動' },
  { id: 'bashogae', name: '場所がえ', category: 'attack', effect: '他プレイヤーと現在地を交換' },
  { id: 'bebikyura', name: 'ベビキュラー', category: 'attack', effect: '他プレイヤーの持ち金を2〜5回吸い取る' },
  { id: 'bouzu', name: '坊主丸儲け', category: 'attack', effect: '他プレイヤー全員の所持金をすべて入手' },
  { id: 'mochigane-zero', name: '持ち金ゼロ', category: 'attack', effect: '誰かの所持金を0円にする' },
  { id: 'tairanomasa', name: 'たいらのまさ', category: 'attack', effect: '全プレイヤーの所持金を平均化' },
  { id: 'acchiike', name: 'あっちいけ', category: 'attack', effect: '貧乏神を他プレイヤーに移動' },
  { id: 'kingni', name: 'キングに！', category: 'attack', effect: '貧乏神をキングボンビーに変身' },
  { id: 'surinoginji', name: 'スリの銀次', category: 'attack', effect: '他プレイヤーがスリに遭遇しやすくなる' },
  { id: 'zekkouchou-kuzushi', name: '絶好調くずし', category: 'attack', effect: '絶好調のプレイヤーの絶好調を終了' },
  { id: 'zeppuchou', name: '絶不調', category: 'attack', effect: 'サイコロの数字が1〜2のみになる' },
  { id: 'kogun', name: '孤軍奮闘', category: 'attack', effect: '他プレイヤーのヒーローを3年間行動不能' },
  { id: 'bukiyosaraba', name: '武器よさらば', category: 'attack', effect: '他プレイヤーの攻撃系カードを消滅' },
  { id: 'devil-haken', name: 'デビル派遣', category: 'attack', effect: '他プレイヤーにデビルをとりつかせる' },
  { id: 'tokkaekko', name: 'とっかえっこ', category: 'attack', effect: '他プレイヤーと所持金を交換' },
  // --- ラッキー系 ---
  { id: '10oku', name: '10億円', category: 'lucky', effect: '10億円が貰える' },
  { id: 'itadakimasu', name: 'いただきます', category: 'lucky', effect: '他プレイヤーと同じマスでカードを1枚奪う' },
  { id: 'ikkaku', name: '一攫千金', category: 'lucky', effect: '一定確率で大金が貰える' },
  { id: 'ittouchi', name: '一頭地を抜く', category: 'lucky', effect: '最も所持金の多いプレイヤーと同額+α' },
  { id: 'angel', name: 'エンジェル', category: 'lucky', effect: '毎月お金がもらえる。ミカエルに進化も' },
  { id: 'otonosama', name: 'お殿様', category: 'lucky', effect: '他プレイヤーが目的地到着時に同額入手' },
  { id: 'oharai', name: 'おはらい', category: 'lucky', effect: 'デビル系を消滅させる' },
  { id: 'oyakugomen', name: 'お役ごめん', category: 'lucky', effect: '歴史ヒーローを解任できる' },
  { id: 'cardbank', name: 'カードバンク', category: 'lucky', effect: 'カードバンクにカードを預けられる' },
  { id: 'kattekimasu', name: '買って来ます', category: 'lucky', effect: '所持金で買える一番高い物件を購入' },
  { id: 'kikan-encho', name: '期間延長', category: 'lucky', effect: '周遊カードの使用回数をリセット' },
  { id: 'kimigasubete', name: '君がすべて！', category: 'lucky', effect: '所持カードを全て同じカードに変える' },
  { id: 'ginga', name: '銀河鉄道', category: 'lucky', effect: '銀河鉄道マップに行ける' },
  { id: 'gold', name: 'ゴールド', category: 'lucky', effect: '物件を1/10の価格で購入' },
  { id: 'saikai', name: '最下位', category: 'lucky', effect: '最下位時に3つの良い効果から1つ選べる' },
  { id: 'shredder', name: 'シュレッダー', category: 'lucky', effect: 'カードを複数捨てられる' },
  { id: 'silver', name: 'シルバー', category: 'lucky', effect: '物件を半額で購入' },
  { id: 'cinderella', name: 'シンデレラ', category: 'lucky', effect: '物件1件が無料。12月に徳政令に変化' },
  { id: 'zekkouchou', name: '絶好調', category: 'lucky', effect: '絶好調になれる' },
  { id: 'dabing', name: 'ダビング', category: 'lucky', effect: '持っているカードを1枚複製' },
  { id: 'tokuseiei', name: '徳政令', category: 'lucky', effect: '借金プレイヤーの所持金が0になる' },
  { id: 'toranitsubasa', name: '虎につばさ', category: 'lucky', effect: '到着時の報酬が2倍' },
  { id: 'vacuum', name: 'バキューム', category: 'lucky', min: 4, max: 7, effect: 'うんちをすべて取り除く（数回使用可能）' },
  { id: 'patoka', name: 'パトカード', category: 'lucky', effect: 'スリの銀次から所持金を守る' },
  { id: 'hikikaeken', name: '引換券', category: 'lucky', effect: 'カード売り場で好きなカードと交換' },
  { id: 'fukubukuro', name: '福袋', category: 'lucky', effect: 'ランダムで4〜8枚のカードが手に入る' },
  { id: 'hecchara', name: 'へっちゃら', category: 'lucky', effect: 'しばらくマイナス駅の影響を受けない' },
  { id: 'rentai', name: '連帯保証人', category: 'lucky', effect: '借金時に0円で止まり別プレイヤーが支払う' },
  // --- デビル系 ---
  { id: '128', name: '128', category: 'devil', effect: '128マス進むまで消えない' },
  { id: '1ga-derumade', name: '1が出るまで', category: 'devil', effect: '1が出るまで移動/カード使用不可' },
  { id: 'king-devil', name: 'キングデビル', category: 'devil', effect: '毎月キングデビルが所持金を奪う' },
  { id: 'jigen-bakudan', name: '時限爆弾', category: 'devil', effect: '数ヶ月後に爆発し修理費を支払う' },
  { id: 'devil-card', name: 'デビル', category: 'devil', effect: '毎月デビルが所持金を奪う' },
  { id: 'torikaeshi', name: 'とりかえし', category: 'devil', effect: '処分しないと爆発し修理費を支払う' },
  { id: 'niike', name: '・・・に行け！', category: 'devil', effect: '選ばれた駅に移動するまで消えない', editable: true },
  { id: 'little-devil', name: 'リトルデビル', category: 'devil', effect: '毎月リトルデビルが所持金を奪う' },
  // --- その他 ---
  { id: 'yellow', name: 'イエロー', category: 'other', effect: 'プラス/マイナス駅がカード駅になる' },
  { id: 'unchi', name: 'うんち', category: 'other', effect: '今いるマスにうんちを置く' },
  { id: 'unchi-kabe', name: 'うんちの壁', category: 'other', effect: '特定の駅にうんちを置く' },
  { id: 'shitei-unchi', name: '指定うんち！', category: 'other', effect: '指定したマスにうんちを置く' },
  { id: 'bachiatari', name: 'ばちあたり', category: 'other', effect: '目的地に殿様うんちを置く' },
  { id: 'mokutekichi-henkou', name: '目的地変更', category: 'other', effect: '目的地が変更される' },
  { id: 'morechauzo', name: 'もれちゃうぞ', category: 'other', effect: '移動後にうんちを置く' },
]

// ============================================================
// 桃鉄2（東日本編＋西日本編）全115種
// ============================================================
const ALL_MOMOTETSU2 = [
  // --- 進行系 ---
  { id: 'kyuko', name: '急行', category: 'progress', dice: 2, effect: 'サイコロ2個で移動' },
  { id: 'kyuko-syuyu', name: '急行周遊', category: 'progress', dice: 2, min: 5, max: 7, effect: 'サイコロ2個（数回使用可能）' },
  { id: 'tokkyu', name: '特急', category: 'progress', dice: 3, effect: 'サイコロ3個で移動' },
  { id: 'tokkyu-syuyu', name: '特急周遊', category: 'progress', dice: 3, min: 5, max: 7, effect: 'サイコロ3個（数回使用可能）' },
  { id: 'shinkansen', name: '新幹線', category: 'progress', dice: 5, effect: 'サイコロ5個で移動' },
  { id: 'shinkansen-syuyu', name: '新幹線周遊', category: 'progress', dice: 5, min: 5, max: 7, effect: 'サイコロ5個（数回使用可能）' },
  { id: 'nozomi', name: 'のぞみ', category: 'progress', dice: 6, effect: 'サイコロ6個で移動' },
  { id: 'nozomi-syuyu', name: 'のぞみ周遊', category: 'progress', dice: 6, min: 5, max: 7, effect: 'サイコロ6個（数回使用可能）' },
  { id: 'hayabusa', name: 'はやぶさ', category: 'progress', dice: 7, effect: 'サイコロ7個で移動' },
  { id: 'hayabusa-syuyu', name: 'はやぶさ周遊', category: 'progress', dice: 7, min: 7, max: 11, effect: 'サイコロ7個（数回使用可能）' },
  { id: 'linear', name: 'リニア', category: 'progress', dice: 10, effect: 'サイコロ10個で移動' },
  { id: 'linear-syuyu', name: 'リニア周遊', category: 'progress', dice: 10, min: 9, max: 15, effect: 'サイコロ10個（数回使用可能）' },
  { id: 'special', name: 'スペシャル', category: 'progress', effect: '1〜6マスから好きな数だけ進める' },
  { id: 'specialz', name: 'スペシャルズ', category: 'progress', min: 5, max: 6, effect: '1〜6マスから好きな数（数回使用可能）' },
  { id: 'all6', name: 'オール6', category: 'progress', effect: 'サイコロの目がすべて6になる' },
  // --- 移動系 ---
  { id: 'buttobi', name: 'ぶっとび', category: 'move', effect: 'ランダムな物件駅に移動' },
  { id: 'buttobi-syuyu', name: 'ぶっとび周遊', category: 'move', min: 5, max: 9, effect: 'ランダムな物件駅（数回使用可能）' },
  { id: 'star-tobi', name: '☆飛び', category: 'move', effect: 'カード売り場へ移動' },
  { id: 'star-tobi-syuyu', name: '☆飛び周遊', category: 'move', min: 7, max: 9, effect: 'カード売り場へ移動（数回使用可能）' },
  { id: 'bukken-tobi', name: '物件飛び', category: 'move', effect: '独占可能な物件駅へ移動して購入' },
  { id: 'bukken-tobi-syuyu', name: '物件飛び周遊', category: 'move', min: 5, max: 9, effect: '物件駅へ移動して購入（数回使用可能）' },
  { id: 'goudatsu-tobi', name: '強奪飛び', category: 'move', effect: '他社長の物件駅へ移動し物件を強奪' },
  { id: 'goudatsu-tobi-syuyu', name: '強奪飛び周遊', category: 'move', min: 5, max: 8, effect: '物件駅へ移動し強奪（数回使用可能）' },
  { id: 'teleport', name: 'テレポート', category: 'move', effect: '他プレイヤーの1〜3マス隣に移動' },
  { id: 'senzaiichiguu', name: '千載一遇', category: 'move', effect: '目的地の1〜9マス以内に移動' },
  { id: 'kitahe', name: '北へ！', category: 'move', effect: '今いるマスより北の駅にランダム移動' },
  { id: 'nishihe', name: '西へ！', category: 'move', effect: '今いるマスより西の物件駅にランダム移動' },
  { id: 'satogaeri', name: '里帰り', category: 'move', effect: '発祥地の駅へ移動' },
  { id: 'bookmark', name: 'ブックマーク', category: 'move', effect: '駅で使うとその駅名のカードに変化', editable: true },
  { id: 'moyorinoekide', name: '最寄りの駅で', category: 'move', effect: '一番近い物件駅に移動' },
  { id: 'ashibumi', name: '足踏み', category: 'move', effect: '今いるマスに留まりもう一度効果を受ける' },
  { id: 'chototsu', name: '猪突猛進', category: 'move', effect: '曲がり角まで進み続ける' },
  { id: 'unchi-totsunyuu', name: 'うんち突入', category: 'move', effect: 'うんちを通り抜けることができる' },
  { id: 'heliport', name: 'ヘリポート', category: 'move', effect: 'ヘリポート駅の中から選んで移動' },
  { id: 'takarakuji', name: '宝くじ駅', category: 'move', effect: '近くの宝くじ駅に移動して宝くじを引ける' },
  { id: 'mokutekichi-chikaku', name: '目的地の近く', category: 'move', effect: '目的地のとなりのマスに移動' },
  { id: 'rassel', name: 'ラッセル車', category: 'move', effect: '1年間、豪雪地帯でも通常通り移動可能' },
  { id: '229masu', name: '229マス', category: 'move', effect: '229マス進むまでサイコロ増加カードの効果' },
  // --- 攻撃系 ---
  { id: 'nottori', name: '乗っ取り', category: 'attack', effect: '物件駅で他社長の物件を1件乗っ取り' },
  { id: 'nottori-syuyu', name: '乗っ取り周遊', category: 'attack', min: 5, max: 6, effect: '物件を乗っ取り（数回使用可能）' },
  { id: 'katanagari', name: '刀狩り', category: 'attack', effect: '他プレイヤーのカードを1〜2枚奪う' },
  { id: 'gousokkyuu', name: '豪速球', category: 'attack', effect: '他プレイヤー全員のカードをランダムに消滅' },
  { id: 'saihate', name: '最果て', category: 'attack', effect: '他プレイヤーを一番遠い場所に移動' },
  { id: 'summit', name: 'サミット', category: 'attack', effect: '他プレイヤー全員を自分のいる所に集合' },
  { id: 'syuyu-kinshi', name: '周遊禁止', category: 'attack', effect: '他プレイヤーの周遊カードをランクダウン' },
  { id: 'gyuuho', name: '牛歩', category: 'attack', effect: '他プレイヤーを1マスずつしか進めなくする' },
  { id: 'fuuin', name: 'ふういん', category: 'attack', effect: '他プレイヤー全員をカード使用不可に' },
  { id: 'toumin', name: '冬眠', category: 'attack', effect: '他プレイヤー全員を行動不能にする' },
  { id: 'onara', name: 'オナラ', category: 'attack', effect: '他プレイヤーを目的地から15マス遠ざける' },
  { id: 'pittari', name: 'ぴったり', category: 'attack', effect: '他プレイヤーと同じマスに移動' },
  { id: 'bashogae', name: '場所がえ', category: 'attack', effect: '他プレイヤーと現在地を交換' },
  { id: 'bebikyura', name: 'ベビキュラー', category: 'attack', effect: '他プレイヤーの持ち金を奪う' },
  { id: 'bouzu', name: '坊主丸儲け', category: 'attack', effect: '他プレイヤー全員の所持金をすべて入手' },
  { id: 'mochigane-zero', name: '持ち金ゼロ', category: 'attack', effect: '誰かの所持金を0円にする' },
  { id: 'tairanomasa', name: 'たいらのまさ', category: 'attack', effect: '全プレイヤーの所持金を平均化' },
  { id: 'tokkaekko', name: 'とっかえっこ', category: 'attack', effect: '他プレイヤーと所持金を交換' },
  { id: 'acchiike', name: 'あっちいけ', category: 'attack', effect: '貧乏神を他プレイヤーに移動' },
  { id: 'kingni', name: 'キングに！', category: 'attack', effect: '貧乏神をキングボンビーに変身' },
  { id: 'surinoginji', name: 'スリの銀次', category: 'attack', effect: '他プレイヤーがスリに遭遇しやすくなる' },
  { id: 'kogun', name: '孤軍奮闘', category: 'attack', effect: '他プレイヤーのヒーローを3年間停止' },
  { id: 'devil-haken', name: 'デビル派遣', category: 'attack', effect: '他プレイヤーにデビルをとりつかせる' },
  { id: 'zekkouchou-kuzushi', name: '絶好調くずし', category: 'attack', effect: '絶好調のプレイヤーの絶好調を終了' },
  { id: 'zeppuchou', name: '絶不調', category: 'attack', effect: '他プレイヤーを絶不調にする' },
  { id: 'kurushuu-nai', name: '苦しゅうない', category: 'attack', effect: '他プレイヤーを自分の1〜3マス内に移動' },
  { id: 'oya-no-soudori', name: '親の総取り', category: 'attack', effect: 'サイコロ10以上で他全員のお金を総取り' },
  // --- ラッキー系 ---
  { id: '10oku', name: '10億円', category: 'lucky', effect: '10億円が貰える' },
  { id: 'itadakimasu', name: 'いただきます', category: 'lucky', effect: '他プレイヤーと同じマスでカードを1枚奪う' },
  { id: 'angel', name: 'エンジェル', category: 'lucky', effect: '毎月お金がもらえる。ミカエルに進化も' },
  { id: 'otonosama', name: 'お殿様', category: 'lucky', effect: '他プレイヤーが目的地到着時に同額入手' },
  { id: 'oharai', name: 'おはらい', category: 'lucky', effect: 'デビル系を消滅させる' },
  { id: 'oyakugomen', name: 'お役ごめん', category: 'lucky', effect: '歴史ヒーローを解任できる' },
  { id: 'cardbank', name: 'カードバンク', category: 'lucky', effect: 'カードバンクにカードを預けられる' },
  { id: 'kattekimasu', name: '買って来ます', category: 'lucky', effect: '所持金で買える一番高い物件を購入' },
  { id: 'kikan-encho', name: '期間延長', category: 'lucky', effect: '周遊カードの使用回数をリセット' },
  { id: 'kimigasubete', name: '君がすべて！', category: 'lucky', effect: '所持カードを全て同じカードに変える' },
  { id: 'ginga', name: '銀河鉄道', category: 'lucky', effect: '銀河鉄道マップに行ける' },
  { id: 'gold', name: 'ゴールド', category: 'lucky', effect: '物件を1/10の価格で購入' },
  { id: 'saikai', name: '最下位', category: 'lucky', effect: '最下位時に3つの効果から1つ選べる' },
  { id: 'shredder', name: 'シュレッダー', category: 'lucky', effect: 'カードを数枚選んで捨てられる' },
  { id: 'silver', name: 'シルバー', category: 'lucky', effect: '物件を半額で購入' },
  { id: 'cinderella', name: 'シンデレラ', category: 'lucky', effect: '物件1件が無料。12月に徳政令に変化' },
  { id: 'zekkouchou', name: '絶好調', category: 'lucky', effect: '絶好調になれる' },
  { id: 'dabing', name: 'ダビング', category: 'lucky', effect: '持っているカードを1枚複製' },
  { id: 'diamond', name: 'ダイヤモンド', category: 'lucky', effect: '現在の年数×10億円で売れる' },
  { id: 'tokuseiei', name: '徳政令', category: 'lucky', effect: '借金プレイヤーの所持金が0になる' },
  { id: 'toranitsubasa', name: '虎につばさ', category: 'lucky', effect: '到着時の報酬が2倍' },
  { id: 'vacuum', name: 'バキューム', category: 'lucky', min: 4, max: 7, effect: 'うんちをすべて取り除く（数回使用可能）' },
  { id: 'patocars', name: 'パトカーズ', category: 'lucky', min: 3, max: 5, effect: 'スリの銀次を撃退（数回発動）' },
  { id: 'patoka', name: 'パトカード', category: 'lucky', effect: 'スリの銀次から所持金を守る' },
  { id: 'platinum', name: 'プラチナ', category: 'lucky', effect: '全物件を1/10の価格で購入' },
  { id: 'hikikaeken', name: '引換券', category: 'lucky', effect: 'カード売り場で好きなカードと交換' },
  { id: 'fukubukuro', name: '福袋', category: 'lucky', effect: 'ランダムで4〜8枚のカードが手に入る' },
  { id: 'hecchara', name: 'へっちゃら', category: 'lucky', effect: '約2年間赤マスの影響を受けない' },
  { id: 'rentai', name: '連帯保証人', category: 'lucky', effect: '借金時に0円で止まり別プレイヤーが支払う' },
  { id: 'kyuushi', name: '九死に一生', category: 'lucky', effect: 'キングボンビーを通常の貧乏神に戻せる' },
  { id: 'mokutekichi-henkou', name: '目的地変更', category: 'lucky', effect: '目的地を再抽選して変更' },
  // --- デビル系 ---
  { id: '128', name: '128', category: 'devil', effect: '128マス進むまで消えない' },
  { id: '1ga-derumade', name: '1が出るまで', category: 'devil', effect: '1が出るまで行動できない' },
  { id: 'king-devil', name: 'キングデビル', category: 'devil', effect: '毎月キングデビルに大金を奪われる' },
  { id: 'jigen-bakudan', name: '時限爆弾', category: 'devil', effect: '数ヶ月後に爆発し修理費とカードを失う' },
  { id: 'devil-card', name: 'デビル', category: 'devil', effect: '毎月デビルにそこそこの額を奪われる' },
  { id: 'torikaeshi', name: 'とりかえし', category: 'devil', effect: '処分しないと爆発し修理費を支払う' },
  { id: 'niike', name: '・・・に行け！', category: 'devil', effect: '選ばれた駅に到着するまで消えない', editable: true },
  { id: 'little-devil', name: 'リトルデビル', category: 'devil', effect: '毎月リトルデビルに少額を奪われる' },
  { id: 'oitekebori', name: 'おいてけ堀', category: 'devil', effect: '毎月カードを1枚捨てなければいけない' },
  { id: 'hitoriwarai', name: 'ひとり笑い', category: 'devil', effect: '入手するとしばらく行動できなくなる' },
  { id: 'nemimini-mizu', name: '寝耳に水', category: 'devil', effect: '入手時に貧乏神がとりつく' },
  { id: 'honeori-zon', name: '骨折り損', category: 'devil', effect: '目的地到着しても援助金が入らない' },
  { id: 'nakittsura', name: '泣きっ面に蜂', category: 'devil', effect: 'マイナス駅で通常の16倍の持ち金が減る' },
  { id: '999', name: '999', category: 'devil', effect: '999マス進むまで消えない' },
  // --- その他 ---
  { id: 'yellow', name: 'イエロー', category: 'other', effect: 'プラス/マイナス駅がカード駅になる' },
  { id: 'unchi', name: 'うんち', category: 'other', effect: '今いるマスにうんちを落とす' },
  { id: 'unchi-stoker', name: 'うんちストーカー', category: 'other', effect: '自分の後にうんちがついてきて追い越されない' },
  { id: 'shitei-unchi', name: '指定うんち！', category: 'other', effect: '指定したマスにうんちを落とす' },
  { id: 'bachiatari', name: 'ばちあたり', category: 'other', effect: '目的地にうんちを落とす' },
  { id: 'tobichiri', name: 'とびちり', category: 'other', effect: '他プレイヤーの近くに3個のうんちを落とす' },
  { id: 'morechauzo', name: 'もれちゃうぞ', category: 'other', effect: 'サイコロ3〜5個振り、移動後にうんちを落とす' },
  { id: '3nen-unchi', name: '3年うんち', category: 'other', effect: '今いるマスに3年間残るうんちを落とす' },
]

// ============================================================
// ワールド版 全107種+
// ============================================================
const ALL_WORLD = [
  // --- 進行系（タンク系） ---
  { id: 'propera', name: 'プロペラ', category: 'progress', dice: 2, min: 3, max: 3, effect: 'サイコロ2個（3回使用可能）' },
  { id: 'souhatsu-propera', name: '双発プロペラ', category: 'progress', dice: 3, min: 3, max: 3, effect: 'サイコロ3個（3回使用可能）' },
  { id: 'jet', name: 'ジェット', category: 'progress', dice: 4, min: 3, max: 3, effect: 'サイコロ4個（3回使用可能）' },
  { id: 'onsoku', name: '音速', category: 'progress', dice: 5, min: 3, max: 3, effect: 'サイコロ5個（3回使用可能）' },
  { id: 'chouonsoku', name: '超音速', category: 'progress', dice: 6, min: 3, max: 3, effect: 'サイコロ6個（3回使用可能）' },
  { id: 'lightning', name: 'ライトニング', category: 'progress', dice: 8, effect: 'サイコロ8個で移動' },
  { id: 'special', name: 'スペシャル', category: 'progress', effect: '1〜6マスから好きな数だけ進める' },
  { id: 'all6', name: 'オール6', category: 'progress', effect: 'サイコロの目がすべて6になる' },
  // --- 移動系 ---
  { id: 'buttobi', name: 'ぶっとび', category: 'move', min: 3, max: 3, effect: 'ランダムな物件駅に移動（3回使用可能）' },
  { id: 'higashihe', name: '東へ！', category: 'move', effect: '今より東の物件駅に移動' },
  { id: 'nishihe', name: '西へ！', category: 'move', effect: '今より西の物件駅に移動' },
  { id: 'bookmark', name: 'ブックマーク', category: 'move', effect: '物件駅で使うとその駅のカードに変化', editable: true },
  { id: 'senzaiichiguu', name: '千載一遇', category: 'move', effect: '目的地の1〜9マス以内に移動' },
  { id: 'area-tobi', name: 'エリア飛び', category: 'move', min: 3, max: 3, effect: '7大陸から選んで移動（3回使用可能）' },
  { id: '6daitoshi', name: '6大都市', category: 'move', min: 3, max: 3, effect: '世界6大都市から選んで移動（3回使用可能）' },
  { id: 'kuukou-tobi', name: '空港飛び', category: 'move', min: 3, max: 3, effect: '4ヶ所の空港駅から選んで移動（3回使用可能）' },
  { id: 'star-tobi', name: '☆飛び', category: 'move', min: 3, max: 3, effect: 'カード売り場へ移動（3回使用可能）' },
  { id: 'bukken-tobi', name: '物件飛び', category: 'move', min: 3, max: 3, effect: '独占可能な物件駅へ移動（3回使用可能）' },
  { id: 'goudatsu-tobi', name: '強奪飛び', category: 'move', min: 3, max: 3, effect: '他社長の物件駅へ移動し強奪（3回使用可能）' },
  { id: 'ashibumi', name: '足踏み', category: 'move', effect: '今いる駅にもう一度止まる' },
  { id: 'moyorinoekide', name: '最寄りの駅で', category: 'move', effect: '最寄りの物件駅に移動して購入' },
  { id: 'chototsu', name: '猪突猛進', category: 'move', effect: '角にぶつかるまで移動' },
  { id: 'teleport', name: 'テレポート', category: 'move', effect: '他プレイヤーの1〜3マス離れた場所に移動' },
  { id: 'netsukikyuu', name: '熱気球', category: 'move', effect: '現在地から見える範囲の場所に移動' },
  { id: 'rakkasan', name: '落下傘', category: 'move', effect: '空路から近くの地上に飛び降りる' },
  // --- 攻撃系 ---
  { id: 'onara', name: 'オナラ', category: 'attack', effect: '相手全員を目的地から15マス遠ざける' },
  { id: 'bashogae', name: '場所がえ', category: 'attack', effect: '相手1人と場所を入れ替える' },
  { id: 'summit', name: 'サミット', category: 'attack', effect: '相手全員を自分のマスに集める' },
  { id: 'kinkyuu-chakuriku', name: '緊急着陸', category: 'attack', effect: '空路の相手を空港駅に着陸させ1回休み' },
  { id: 'chikyuu-uragawa', name: '地球の裏側', category: 'attack', effect: '自分か相手を地球の裏側に移動' },
  { id: 'henseihuu', name: '偏西風', category: 'attack', effect: '相手全員を西から東へぶっとばす' },
  { id: 'hikyou-tanken', name: '秘境探検', category: 'attack', effect: '相手をランダムな秘境へ飛ばし1回休み' },
  { id: 'bashomaze', name: '場所混ぜ', category: 'attack', effect: '全員の場所を入れ替える' },
  { id: 'mu-tairiku', name: 'ムー大陸へ', category: 'attack', effect: '自分か相手をムー大陸に移動' },
  { id: 'bebikyura', name: 'ベビキュラー', category: 'attack', effect: '相手1人の持ち金を2〜5回吸い取る' },
  { id: 'tokkaekko', name: 'とっかえっこ', category: 'attack', effect: '相手1人と持ち金を交換' },
  { id: 'mochigane-zero', name: '持ち金ゼロ', category: 'attack', effect: '自分か相手の持ち金をゼロにする' },
  { id: 'bouzu', name: '坊主丸儲け', category: 'attack', effect: '相手全員の持ち金を自分のものに' },
  { id: 'tairanomasa', name: 'たいらのまさ', category: 'attack', effect: '全員の持ち金を平均化' },
  { id: 'surinoginji', name: 'スリの銀次', category: 'attack', effect: '相手がスリに遭遇しやすくなる' },
  { id: 'katanagari', name: '刀狩り', category: 'attack', effect: '相手1人のカードを1〜2枚奪う' },
  { id: 'gousokkyuu', name: '豪速球', category: 'attack', effect: '相手全員のカードを2〜8枚壊す' },
  { id: 'bukiyosaraba', name: '武器よさらば', category: 'attack', effect: '相手の攻撃系カードをすべて消滅' },
  { id: 'gasketsu', name: 'ガス欠', category: 'attack', effect: '相手のタンク系カードの使用回数を1にする' },
  { id: 'devil-haken', name: 'デビル派遣', category: 'attack', effect: '相手にデビル系カードを送り付ける' },
  { id: 'shuffle', name: 'シャッフル', category: 'attack', effect: '全員のカードをシャッフル' },
  { id: 'ebi-de-tai', name: '海老で鯛を', category: 'attack', min: 2, max: 4, effect: '相手のカード1枚と交換（数回使用可能）' },
  { id: 'fuuin', name: 'ふういん', category: 'attack', effect: '相手全員をカード使用不可にする' },
  { id: 'toumin', name: '冬眠', category: 'attack', effect: '相手全員を行動不能にする' },
  { id: 'gyuuho', name: '牛歩', category: 'attack', effect: '相手を1マスずつしか動けなくする' },
  { id: 'zeppuchou', name: '絶不調', category: 'attack', effect: '相手を絶不調にする' },
  { id: 'kogun', name: '孤軍奮闘', category: 'attack', effect: '相手のヒーローの効果を3年間停止' },
  { id: 'nottori', name: '乗っ取り', category: 'attack', effect: '物件駅で相手の物件を1件奪う' },
  { id: 'pittari', name: 'ぴったり', category: 'attack', effect: '相手と同じマスに移動' },
  { id: 'zekkouchou-kuzushi', name: '絶好調くずし', category: 'attack', effect: '相手の絶好調を終わらせる' },
  { id: 'acchiike', name: 'あっちいけ', category: 'attack', effect: 'ボンビーをランダムな相手に押し付ける' },
  { id: 'kingni', name: 'キングに！', category: 'attack', effect: '貧乏神をキングボンビーにする' },
  // --- ラッキー系（便利系） ---
  { id: 'yellow', name: 'イエロー', category: 'lucky', effect: 'プラス/マイナス駅がカード駅に変わる' },
  { id: 'hecchara', name: 'へっちゃら', category: 'lucky', effect: 'しばらくマイナス駅の効果を無効化' },
  { id: 'unchi-totsunyuu', name: 'うんち突入', category: 'lucky', effect: 'うんちを無視して移動できる' },
  { id: 'mantan', name: '満タン', category: 'lucky', effect: 'タンク系カード1枚の使用回数を回復' },
  { id: 'tokuseiei', name: '徳政令', category: 'lucky', effect: '借金プレイヤーの持ち金が0に' },
  { id: 'ikkaku', name: '一獲千金', category: 'lucky', effect: 'ごくまれに大金が手に入る' },
  { id: 'saikai', name: '最下位', category: 'lucky', effect: '最下位時に3つの効果から1つ選べる' },
  { id: 'vacuum', name: 'バキューム', category: 'lucky', min: 3, max: 3, effect: 'うんちをすべて取り除く（3回使用可能）' },
  { id: 'tochuu-gesha', name: '途中下車', category: 'lucky', effect: 'サイコロの出目の範囲内で好きな場所に止まる' },
  { id: 'oyakugomen', name: 'お役ごめん', category: 'lucky', effect: '歴史ヒーローを解任できる' },
  { id: 'zekkouchou', name: '絶好調', category: 'lucky', effect: '絶好調になる' },
  { id: 'bomberman', name: 'ボンバーマン', category: 'lucky', effect: '自分のマスにボムを置く' },
  { id: '10oku', name: '10億円', category: 'lucky', effect: '10億円がもらえる' },
  { id: '100oku', name: '100億円', category: 'lucky', effect: '100億円がもらえる' },
  { id: '1000oku', name: '1000億円', category: 'lucky', effect: '1000億円がもらえる' },
  { id: 'ramu-shoukan', name: 'ラ・ムー召喚', category: 'lucky', effect: '魔神ラ・ムーにめつぼうボタンを押させる' },
  { id: 'angel', name: 'エンジェル', category: 'lucky', effect: '毎月お金がもらえる。ミカエルに進化も' },
  { id: 'otonosama', name: 'お殿様', category: 'lucky', effect: '相手が目的地到着すると同額入手' },
  { id: 'toranitsubasa', name: '虎に翼', category: 'lucky', effect: '目的地到着金が2倍' },
  { id: 'toranitsubasa2', name: '虎に翼×2', category: 'lucky', effect: '目的地到着金が4倍' },
  { id: 'patoka', name: 'パトカード', category: 'lucky', effect: 'スリの銀次を一度だけ無効化' },
  { id: 'itadakimasu', name: 'いただきます', category: 'lucky', effect: '相手と同じマスでカードを1枚奪う' },
  { id: 'rentai', name: '連帯保証人', category: 'lucky', effect: '借金時に0円で止まり相手が支払う' },
  { id: 'mezamashi', name: 'めざまし', category: 'lucky', effect: '冬眠などの行動不能から回復' },
  { id: 'silver', name: 'シルバー', category: 'lucky', effect: '物件を半額で購入' },
  { id: 'gold', name: 'ゴールド', category: 'lucky', effect: '物件を1/10の価格で購入' },
  { id: 'cinderella', name: 'シンデレラ', category: 'lucky', effect: '物件1件が無料' },
  { id: 'hikikaeken', name: '引換券', category: 'lucky', effect: 'カード売り場のカードを1枚無料で交換' },
  { id: 'dabing', name: 'ダビング', category: 'lucky', effect: '手持ちのカードを1枚複製' },
  { id: 'shredder', name: 'シュレッダー', category: 'lucky', effect: 'デビル系カードを5〜9枚削除' },
  { id: 'oharai', name: 'おはらい', category: 'lucky', effect: 'デビル系をすべて追い払う' },
  { id: 'fukubukuro', name: '福袋', category: 'lucky', effect: 'カードが最大8枚手に入る' },
  { id: 'cardbank', name: 'カードバンク', category: 'lucky', effect: 'カードバンクにカードを預けられる' },
  { id: 'kattekimasu', name: '買って来ます', category: 'lucky', effect: '持ち金で買える一番高い物件を購入' },
  { id: 'ginga', name: '銀河鉄道', category: 'lucky', effect: '銀河鉄道へ行く' },
  { id: 'ittouchi', name: '一頭地を抜く', category: 'lucky', effect: '最も所持金の多いプレイヤーと同額+α' },
  { id: 'mokutekichi-henkou', name: '目的地変更', category: 'lucky', effect: '目的地が変更される' },
  { id: 'junban-henkou', name: '順番変更', category: 'lucky', effect: '次の月初めに順番をシャッフル' },
  { id: 'namahagen', name: 'ナマハーゲン', category: 'lucky', effect: 'ナマハーゲンを召喚する' },
  // --- デビル系 ---
  { id: 'little-devil', name: 'リトルデビル', category: 'devil', effect: '毎月リトルデビルが持ち金を少し減らす' },
  { id: 'devil-card', name: 'デビル', category: 'devil', effect: '毎月デビルが持ち金を減らす' },
  { id: 'king-devil', name: 'キングデビル', category: 'devil', effect: '毎月キングデビルが持ち金を大きく減らす' },
  { id: 'torikaeshi', name: 'とりかえし', category: 'devil', effect: '早めに処分しないと爆発して持ち金が減る' },
  { id: 'jigen-bakudan', name: '時限爆弾', category: 'devil', effect: '数ヶ月後に爆発し持ち金とカードを失う' },
  { id: 'niike', name: '・・・に行け！', category: 'devil', effect: '選ばれた駅に到着するまで消えない', editable: true },
  { id: '128', name: '128', category: 'devil', effect: '128マス進むまで消えない' },
  { id: '1ga-derumade', name: '1が出るまで', category: 'devil', effect: '1が出るまで動けない' },
  // --- その他（うんち系） ---
  { id: 'unchi', name: 'うんち', category: 'other', effect: '自分のマスにうんちを落とす' },
  { id: 'shitei-unchi', name: '指定うんち！', category: 'other', effect: '好きな場所にうんちを落とす' },
  { id: 'bachiatari', name: 'ばちあたり', category: 'other', effect: '目的地に殿様うんちを落とす' },
  { id: 'kuukou-unchi', name: '空港うんち', category: 'other', effect: '4つの空港にうんちを落とす' },
  { id: 'morechauzo', name: 'もれちゃうぞ', category: 'other', effect: 'サイコロ3〜5個振り移動後にうんちを落とす' },
]

// ============================================================
// JAPAN+版（スマホ版。令和版ベース）
// ============================================================
const ALL_JAPANPLUS = [
  // --- 進行系 ---
  { id: 'kyuko', name: '急行', category: 'progress', dice: 2, effect: 'サイコロ2個で移動' },
  { id: 'kyuko-syuyu', name: '急行周遊', category: 'progress', dice: 2, min: 3, max: 5, effect: 'サイコロ2個（数回使用可能）' },
  { id: 'tokkyu', name: '特急', category: 'progress', dice: 3, effect: 'サイコロ3個で移動' },
  { id: 'tokkyu-syuyu', name: '特急周遊', category: 'progress', dice: 3, min: 5, max: 7, effect: 'サイコロ3個（数回使用可能）' },
  { id: 'shinkansen', name: '新幹線', category: 'progress', dice: 4, effect: 'サイコロ4個で移動' },
  { id: 'special', name: 'スペシャル', category: 'progress', effect: '1〜6マスから好きな数だけ進める' },
  // --- 移動系 ---
  { id: 'buttobi', name: 'ぶっとび', category: 'move', effect: 'ランダムな物件駅に移動' },
  { id: 'star-tobi', name: '☆飛び', category: 'move', effect: 'カード売り場へ移動' },
  { id: 'bukken-tobi', name: '物件飛び', category: 'move', effect: '独占可能な物件駅へ移動して購入' },
  { id: 'teleport', name: 'テレポート', category: 'move', effect: '他プレイヤーの1〜3マス隣に移動' },
  { id: 'senzaiichiguu', name: '千載一遇', category: 'move', effect: '目的地の1〜9マス以内に移動' },
  { id: 'bookmark', name: 'ブックマーク', category: 'move', effect: '駅で使うとその駅名のカードに変化', editable: true },
  { id: 'moyorinoekide', name: '最寄りの駅で', category: 'move', effect: '一番近い物件駅に移動' },
  { id: 'ashibumi', name: '足踏み', category: 'move', effect: '今いるマスに留まりもう一度効果を受ける' },
  // --- 攻撃系 ---
  { id: 'nottori', name: '乗っ取り', category: 'attack', effect: '物件駅で他社長の物件を1件乗っ取り' },
  { id: 'katanagari', name: '刀狩り', category: 'attack', effect: '他プレイヤーのカードを1枚奪う' },
  { id: 'gousokkyuu', name: '豪速球', category: 'attack', effect: '他プレイヤーのカードをランダムに消滅' },
  { id: 'saihate', name: '最果て', category: 'attack', effect: '他プレイヤーを目的地から遠くに移動' },
  { id: 'summit', name: 'サミット', category: 'attack', effect: '自分のいる場所に他プレイヤー全員を集合' },
  { id: 'tondenhei', name: '屯田兵', category: 'attack', effect: '他プレイヤーを北海道に飛ばし1回休み' },
  { id: 'gyuuho', name: '牛歩', category: 'attack', effect: '他プレイヤーを1マスずつしか進めなくする' },
  { id: 'fuuin', name: 'ふういん', category: 'attack', effect: '他プレイヤー全員をカード使用不可に' },
  { id: 'toumin', name: '冬眠', category: 'attack', effect: '他プレイヤー全員を行動不能にする' },
  { id: 'pittari', name: 'ぴったり', category: 'attack', effect: '他プレイヤーと同じマスに移動' },
  { id: 'acchiike', name: 'あっちいけ', category: 'attack', effect: '貧乏神を他プレイヤーに移動' },
  // --- ラッキー系 ---
  { id: '10oku', name: '10億円', category: 'lucky', effect: '10億円が貰える' },
  { id: 'angel', name: 'エンジェル', category: 'lucky', effect: '毎月お金がもらえる' },
  { id: 'oharai', name: 'おはらい', category: 'lucky', effect: 'デビル系を消滅させる' },
  { id: 'gold', name: 'ゴールド', category: 'lucky', effect: '物件を1/10の価格で購入' },
  { id: 'silver', name: 'シルバー', category: 'lucky', effect: '物件を半額で購入' },
  { id: 'cinderella', name: 'シンデレラ', category: 'lucky', effect: '物件1件が無料。12月に徳政令に変化' },
  { id: 'zekkouchou', name: '絶好調', category: 'lucky', effect: '絶好調になれる' },
  { id: 'dabing', name: 'ダビング', category: 'lucky', effect: '持っているカードを1枚複製' },
  { id: 'tokuseiei', name: '徳政令', category: 'lucky', effect: '借金プレイヤーの所持金が0になる' },
  { id: 'toranitsubasa', name: '虎につばさ', category: 'lucky', effect: '到着時の報酬が2倍' },
  { id: 'patoka', name: 'パトカード', category: 'lucky', effect: 'スリの銀次から所持金を守る' },
  { id: 'hecchara', name: 'へっちゃら', category: 'lucky', effect: 'しばらくマイナス駅の影響を受けない' },
  { id: 'rentai', name: '連帯保証人', category: 'lucky', effect: '借金時に0円で止まり別プレイヤーが支払う' },
  // --- デビル系 ---
  { id: '128', name: '128', category: 'devil', effect: '128マス進むまで消えない' },
  { id: 'devil-card', name: 'デビル', category: 'devil', effect: '毎月デビルが所持金を奪う' },
  { id: 'torikaeshi', name: 'とりかえし', category: 'devil', effect: '処分しないと爆発し修理費を支払う' },
  { id: 'little-devil', name: 'リトルデビル', category: 'devil', effect: '毎月リトルデビルが所持金を奪う' },
  // --- その他 ---
  { id: 'yellow', name: 'イエロー', category: 'other', effect: 'プラス/マイナス駅がカード駅になる' },
  { id: 'unchi', name: 'うんち', category: 'other', effect: '今いるマスにうんちを置く' },
  { id: 'mokutekichi-henkou', name: '目的地変更', category: 'other', effect: '目的地が変更される' },
]

// ============================================================
// 共通アクセス関数
// ============================================================

function getCardsArray(seriesId) {
  switch (seriesId) {
    case 'momotetsu2': return ALL_MOMOTETSU2
    case 'world': return ALL_WORLD
    case 'japanplus': return ALL_JAPANPLUS
    default: return ALL_SWITCH
  }
}

export function getSyuyuCards(seriesId) {
  return getCardsArray(seriesId).filter((c) => c.min != null && c.max != null)
}

export function getAllCards(seriesId) {
  return getCardsArray(seriesId)
}

export function getSeriesName(seriesId) {
  return SERIES_LIST.find((s) => s.id === seriesId)?.short || seriesId
}

export function isSyuyuCard(cardId, seriesId) {
  return getSyuyuCards(seriesId).some((c) => c.id === cardId)
}

export function getCardDef(cardId, seriesId) {
  return getAllCards(seriesId).find((c) => c.id === cardId)
}
