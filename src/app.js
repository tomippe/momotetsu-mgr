import {
  SERIES_LIST,
  getSyuyuCards,
  getAllCards,
  isSyuyuCard,
  getCardDef,
  getSeriesLimits,
  CARD_CATEGORIES,
} from './cards.js'

const STORAGE_KEY = 'momotetsu-mgr'
const DEFAULT_STATE = {
  version: 2,
  seriesId: null,
  myName: '自分',
  myHand: [],
  myBank: [],
  enemies: [],
  catalogOpen: true,
}

let state = { ...DEFAULT_STATE }
let animateCard = null
let draggingFromCatalog = false

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      state = { ...DEFAULT_STATE, ...parsed }
      if (!state.seriesId) state.seriesId = null
      if (state.seriesId === 'momotetsu2-3year') state.seriesId = 'momotetsu2'
      if (state.currentTab === 'myHand' || state.currentTab === 'myBank') state.currentTab = 'my'
      if (state.currentTab?.startsWith('enemyHand-') || state.currentTab?.startsWith('enemyBank-')) {
        const i = parseInt(state.currentTab.split('-')[1])
        state.currentTab = `enemy-${i}`
      }
      if (!state.enemies) state.enemies = []
      state.enemies.forEach((e) => {
        if (!e.handCards) e.handCards = []
        if (!e.bankCards) e.bankCards = []
      })
    }
  } catch (e) {
    console.warn('loadState failed', e)
  }
}

function saveState() {
  if (!state.seriesId) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function getSyuyuDef(cardId) {
  return getSyuyuCards(state.seriesId).find((c) => c.id === cardId)
}

function addCard(cardId, target, insertAt) {
  if (isTargetFull(target)) return
  const syuyu = getSyuyuDef(cardId)
  const entry = {
    id: cardId,
    remaining: syuyu ? syuyu.max : null,
    max: syuyu ? syuyu.max : null,
  }
  const arr = getArrForTarget(target)
  const idx = (insertAt != null && insertAt >= 0 && insertAt <= arr.length) ? insertAt : arr.length
  arr.splice(idx, 0, entry)
  animateCard = { target, index: idx }
  saveState()
  render()
}

function removeCard(arr, index, target) {
  if (target) {
    const el = document.querySelector(`.card[data-target="${target}"][data-card-index="${index}"]`)
    if (el) {
      el.classList.add('card-exit')
      el.addEventListener('animationend', () => {
        arr.splice(index, 1)
        saveState()
        render()
      }, { once: true })
      return
    }
  }
  arr.splice(index, 1)
  saveState()
  render()
}

function reorderCard(arr, fromIdx, toIdx, target) {
  const [card] = arr.splice(fromIdx, 1)
  const insertAt = toIdx > fromIdx ? toIdx - 1 : toIdx
  arr.splice(insertAt, 0, card)
  animateCard = { target, index: insertAt }
  saveState()
  render()
}

function moveCard(fromArr, fromIdx, toArr, toIdx, toTarget) {
  if (toTarget) {
    const max = getMaxForTarget(toTarget)
    if (toArr.length >= max) return
  }
  const [card] = fromArr.splice(fromIdx, 1)
  toArr.splice(toIdx, 0, card)
  if (toTarget) animateCard = { target: toTarget, index: toIdx }
  saveState()
  render()
}

function useSyuyu(arr, index, skipRender) {
  const card = arr[index]
  if (!card || card.remaining === null || card.remaining === undefined) return false
  card.remaining--
  saveState()
  if (!skipRender) render()
  return true
}

function undoUseSyuyu(arr, index, skipRender) {
  const card = arr[index]
  if (!card || card.remaining === null || card.remaining === undefined) return false
  if (card.max != null && card.remaining >= card.max) return false
  card.remaining++
  saveState()
  if (!skipRender) render()
  return true
}

function extendSyuyu(arr, index) {
  const card = arr[index]
  const syuyu = getSyuyuDef(card?.id)
  if (!syuyu || !card) return
  card.remaining = syuyu.max
  saveState()
  render()
}

function dabing(arr, index, target) {
  const card = arr[index]
  if (!card) return
  if (target) {
    const max = getMaxForTarget(target)
    if (arr.length >= max) return
  }
  const copy = { ...card }
  if (copy.max != null) copy.remaining = copy.max
  arr.splice(index + 1, 0, copy)
  if (target) animateCard = { target, index: index + 1 }
  saveState()
  render()
}

function resetSyuyuAll(target) {
  const arr = getArrForTarget(target)
  if (!arr) return
  arr.forEach((card) => {
    const syuyu = getSyuyuDef(card.id)
    if (syuyu) {
      card.remaining = syuyu.max
      card.max = syuyu.max
    }
  })
  saveState()
  render()
}

function convertSyuyuToNormal(target) {
  const arr = getArrForTarget(target)
  if (!arr) return
  for (let i = arr.length - 1; i >= 0; i--) {
    const syuyu = getSyuyuDef(arr[i].id)
    if (syuyu) {
      const def = getCardDef(arr[i].id, state.seriesId)
      const normalId = arr[i].id.replace(/-syuyu$/, '')
      const normalDef = getCardDef(normalId, state.seriesId)
      if (normalDef && normalDef.id !== arr[i].id) {
        arr[i] = { id: normalId, remaining: null, max: null }
      } else {
        arr.splice(i, 1)
      }
    }
  }
  saveState()
  render()
}

function clearAll(target) {
  if (target === 'myHand') state.myHand = []
  else if (target === 'myBank') state.myBank = []
  else if (target.startsWith('enemyHand-')) {
    const i = parseInt(target.split('-')[1])
    state.enemies[i].handCards = []
  } else if (target.startsWith('enemyBank-')) {
    const i = parseInt(target.split('-')[1])
    state.enemies[i].bankCards = []
  }
  saveState()
  render()
}

function hasAnyCardData() {
  return state.myHand.length > 0 || state.myBank.length > 0 ||
    state.enemies.some((e) => e.handCards.length > 0 || e.bankCards.length > 0)
}

function clearAllCardData() {
  state.myHand = []
  state.myBank = []
  state.enemies.forEach((e) => { e.handCards = []; e.bankCards = [] })
}

function setSeries(id) {
  if (hasAnyCardData()) {
    if (!confirm('既存のデータをクリアしてよろしいですか？')) return
    clearAllCardData()
  }
  state.seriesId = id
  state.catalogOpen = false
  saveState()
  render()
}

function addEnemy() {
  if (state.enemies.length >= 3) return
  state.enemies = [...state.enemies, { name: `敵${state.enemies.length + 1}`, handCards: [], bankCards: [] }]
  saveState()
  render()
}

function deleteEnemy(index) {
  if (!confirm(`${state.enemies[index]?.name || '敵'}を削除しますか？`)) return
  state.enemies.splice(index, 1)
  if (state.currentTab === `enemy-${index}` || !state.enemies.some((_, i) => state.currentTab === `enemy-${i}`)) {
    state.currentTab = 'my'
  }
  saveState()
  render()
}

function removeEnemy(index) {
  if (state.enemies.length <= 1) return
  state.enemies = state.enemies.filter((_, i) => i !== index)
  saveState()
  render()
}

function setEnemyName(index, name) {
  if (state.enemies[index]) state.enemies[index].name = name
  saveState()
  render()
}

function getArrForTarget(target) {
  if (target === 'myHand') return state.myHand
  if (target === 'myBank') return state.myBank
  if (target.startsWith('enemyHand-')) return state.enemies[parseInt(target.split('-')[1])].handCards
  if (target.startsWith('enemyBank-')) return state.enemies[parseInt(target.split('-')[1])].bankCards
  return null
}

function getMaxForTarget(target) {
  const { maxHand, maxBank } = getSeriesLimits(state.seriesId)
  if (target === 'myHand' || target.startsWith('enemyHand-')) return maxHand
  if (target === 'myBank' || target.startsWith('enemyBank-')) return maxBank
  return Infinity
}

function isTargetFull(target) {
  const arr = getArrForTarget(target)
  return arr ? arr.length >= getMaxForTarget(target) : true
}

function renderCard(card, arr, index, target) {
  const def = getCardDef(card.id, state.seriesId)
  const syuyu = getSyuyuDef(card.id)
  const cat = CARD_CATEGORIES[def?.category || 'other']
  const isSyuyu = !!syuyu
  const used = isSyuyu && card.max ? card.max - card.remaining : 0
  const overMin = isSyuyu && syuyu && used >= syuyu.min

  return `
    <div class="card" data-card-index="${index}" data-target="${target}"
         style="--card-color: ${cat?.color || '#6b7280'}"
         draggable="true">
      <div class="card-main">
        <div class="card-header">
          <span class="card-name-wrap">
            <span class="card-name${def?.editable ? ' card-name-editable' : ''}" ${def?.editable ? `data-action="editName" data-arr="${target}" data-idx="${index}"` : ''}>${card.customName || def?.name || card.id}</span>
            ${cat?.label ? `<span class="card-category" style="background: ${cat.bg}">${cat.label}</span>` : ''}
          </span>
        </div>
        ${def?.effect ? `<div class="card-effect">${def.effect}</div>` : ''}
        ${target === 'myBank' || target.startsWith('enemyBank-') ? '' : `
        <div class="card-actions">
          ${isSyuyu ? `<button class="btn btn-extend" data-action="extend" data-arr="${target}" data-idx="${index}">期間延長</button>` : ''}
          <button class="btn btn-dabing" data-action="dabing" data-arr="${target}" data-idx="${index}">ダビング</button>
        </div>
        `}
      </div>
      <div class="card-side">
        <button class="card-trash" data-action="remove" data-arr="${target}" data-idx="${index}" title="削除"><svg class="icon-trash" width="14" height="14" viewBox="0 0 24 24"><use href="#trash-icon"/></svg></button>
        ${isSyuyu ? `
        <div class="card-remaining">
          <span class="remaining-num ${overMin ? 'used-over-min' : ''}">${used}</span>
          <span class="remaining-max">${syuyu.min}~${syuyu.max}</span>
          ${target === 'myBank' || target.startsWith('enemyBank-') ? '' : `<button class="btn-undo-touch" data-action="undoTouch" data-arr="${target}" data-idx="${index}" title="戻す">▼</button>`}
        </div>
        ` : ''}
      </div>
    </div>
  `
}

function renderSeriesSelect() {
  return `
    <div class="series-select">
      <h1>MOMOTETSU Card Manager</h1>
      <p class="series-select-prompt" style="margin-bottom: 1.5rem;">シリーズを選んでください</p>
      <div class="series-grid">
        ${SERIES_LIST.map((s) => `
          <button class="series-btn" data-series="${s.id}">
            <span class="series-label">${s.label}</span>
            ${s.subtitle ? `<small class="series-subtitle">${s.subtitle}</small>` : ''}
            <span class="series-platforms">${(Array.isArray(s.platform) ? s.platform : [s.platform]).map((p) => `<span class="series-platform">${p}</span>`).join('')}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `
}

function renderMain() {
  const allCards = getAllCards(state.seriesId)
  const syuyuCards = getSyuyuCards(state.seriesId)
  const categories = [...new Set(allCards.map((c) => c.category))]

  let currentTab = state.currentTab || 'my'
  if (currentTab.startsWith('enemy-')) {
    const ei = parseInt(currentTab.split('-')[1])
    if (!state.enemies[ei]) currentTab = 'my'
  }

  let tabsHtml = `
    <div class="tabs">
      <button class="tab ${currentTab === 'my' ? 'active' : ''}" data-tab="my">
        <span class="tab-name" data-tab-name="my">${state.myName || '自分'}</span>
      </button>
  `
  state.enemies.forEach((e, i) => {
    tabsHtml += `
      <button class="tab tab-enemy ${currentTab === `enemy-${i}` ? 'active' : ''}" data-tab="enemy-${i}">
        <span class="tab-name" data-enemy-index="${i}">${e.name}</span>
        <span class="tab-delete" data-action="deleteEnemy" data-enemy-index="${i}" title="削除">&times;</span>
      </button>
    `
  })
  if (state.enemies.length < 3) {
    tabsHtml += `<button class="tab" data-action="addEnemy">+ 敵追加</button>`
  }
  tabsHtml += `</div>`

  const renderSection = (target, arr, title) => {
    const max = getMaxForTarget(target)
    const full = arr.length >= max
    const isHand = target === 'myHand' || target.startsWith('enemyHand-')
    return `
    <div class="handbank-section">
      <div class="section-header">
        <h3 class="section-title section-title-overlay">${title} <span style="font-size:0.7rem; font-weight:400">${arr.length}/${max}</span></h3>
        ${arr.length > 0 ? `
        <div class="section-actions">
          ${isHand ? `
          <button class="btn-section" data-action="resetSyuyu" data-target="${target}">周遊初期化</button>
          <button class="btn-section btn-section-warn" data-action="convertSyuyu" data-target="${target}">周遊禁止</button>
          ` : ''}
          <button class="btn-section btn-section-danger" data-action="clearAll" data-target="${target}">全削除</button>
        </div>
        ` : ''}
      </div>
      <div class="card-grid${full ? ' grid-full' : ''}" data-drop-zone="${target}">
        ${arr.map((c, i) => renderCard(c, arr, i, target)).join('')}
        ${full ? '' : `
        <div class="card-add-slot" data-action="openPicker" data-target="${target}" title="カード追加">
          <span class="add-icon">+</span>
        </div>
        `}
      </div>
    </div>
    `
  }

  let panelsHtml = ''
  const renderPlayerPanel = (tabId, handTarget, handArr, bankTarget, bankArr) => {
    panelsHtml += `
      <div class="tab-panel ${currentTab === tabId ? 'active' : ''}" data-panel="${tabId}">
        <div class="handbank-row">
          ${renderSection(handTarget, handArr, '手札')}
          ${renderSection(bankTarget, bankArr, 'バンク')}
        </div>
      </div>
    `
  }

  renderPlayerPanel('my', 'myHand', state.myHand, 'myBank', state.myBank)
  state.enemies.forEach((e, i) => {
    renderPlayerPanel(`enemy-${i}`, `enemyHand-${i}`, e.handCards, `enemyBank-${i}`, e.bankCards)
  })

  const seriesName = SERIES_LIST.find((s) => s.id === state.seriesId)?.short || state.seriesId

  let catalogHtml = ''
  categories.forEach((catId) => {
    const cards = allCards.filter((c) => c.category === catId)
    const cat = CARD_CATEGORIES[catId]
    catalogHtml += `
      <div class="catalog-section">
        <div class="catalog-section-title">${cat?.label || catId}</div>
        <div class="catalog-cards">
          ${cards.map((c) => `
            <div class="catalog-card" draggable="true" data-card-id="${c.id}" data-category="${catId}"
                 style="border-left: 3px solid ${cat?.color || '#d1d5db'}; background: ${cat?.bg || '#f9fafb'}">
              ${c.name}
            </div>
          `).join('')}
        </div>
      </div>
    `
  })

  return `
    <div class="main-wrap">
      <header class="header">
        <h1>MOMOTETSU Card Manager</h1>
        <div class="header-actions">
          <button data-action="changeSeries">${seriesName}</button>
        </div>
      </header>
      ${tabsHtml}
      <div class="content-area">
        ${panelsHtml}
      </div>
    </div>
    <div class="catalog-wrap ${state.catalogOpen ? 'open' : ''}">
      <button class="catalog-toggle" data-action="toggleCatalog"><span class="catalog-handle"></span>カード一覧</button>
      <div class="catalog-content">${catalogHtml}</div>
    </div>
    <div class="trash-zone" data-drop-zone="trash" title="ゴミ箱にドロップで削除"><svg class="icon-trash" width="20" height="20" viewBox="0 0 24 24"><use href="#trash-icon"/></svg></div>
    <div class="picker-overlay" style="display:none">
      <div class="picker-panel">
        <div class="picker-header">
          <span class="picker-title">カードを選択</span>
          <button class="picker-close" data-action="closePicker">&times;</button>
        </div>
        <div class="picker-body">
          ${categories.map((catId) => {
            const cards = allCards.filter((c) => c.category === catId)
            const cat = CARD_CATEGORIES[catId]
            return `
            <div class="picker-section">
              <div class="picker-section-title" style="border-left: 3px solid ${cat?.color || '#d1d5db'}">${cat?.label || catId}</div>
              <div class="picker-cards">
                ${cards.map((c) => `
                  <button class="picker-card" data-card-id="${c.id}" style="border-left: 3px solid ${cat?.color || '#d1d5db'}; background: ${cat?.bg || '#f9fafb'}">
                    ${c.name}
                  </button>
                `).join('')}
              </div>
            </div>
            `
          }).join('')}
        </div>
      </div>
    </div>
  `
}

function getDropIndex(zone, clientX, clientY) {
  const cards = [...zone.querySelectorAll('.card')]
  for (let i = 0; i < cards.length; i++) {
    const rect = cards[i].getBoundingClientRect()
    const midX = rect.left + rect.width / 2
    const midY = rect.top + rect.height / 2
    if (clientY < midY || (clientY < rect.bottom && clientX < midX)) return i
  }
  return cards.length
}

function render() {
  const app = document.getElementById('app')
  if (!state.seriesId) {
    app.innerHTML = renderSeriesSelect()
    bindSeriesSelect()
    return
  }
  app.innerHTML = renderMain()
  bindMain()
  if (animateCard) {
    const el = document.querySelector(`.card[data-target="${animateCard.target}"][data-card-index="${animateCard.index}"]`)
    if (el) {
      el.classList.add('card-enter')
      el.addEventListener('animationend', () => el.classList.remove('card-enter'), { once: true })
    }
    animateCard = null
  }
}

function bindSeriesSelect() {
  document.querySelectorAll('.series-btn').forEach((btn) => {
    btn.onclick = () => setSeries(btn.dataset.series)
  })
}

function blurActiveTabName() {
  const active = document.querySelector('.tab-name:focus')
  if (active) active.blur()
}

function bindMain() {
  document.querySelectorAll('.tab[data-tab]').forEach((tab) => {
    tab.onclick = (e) => {
      if (e.target.closest('.tab-delete')) return
      const tabId = tab.dataset.tab
      const isActive = state.currentTab === tabId || (!state.currentTab && tabId === 'my')
      const nameEl = tab.querySelector('.tab-name')
      if (isActive && nameEl && !nameEl.isContentEditable) {
        nameEl.contentEditable = 'true'
        nameEl.focus()
        return
      }
      blurActiveTabName()
      state.currentTab = tabId
      saveState()
      render()
    }
  })
  document.querySelectorAll('.tab-name').forEach((el) => {
    el.onfocus = () => {
      el.contentEditable = 'true'
      const sel = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(el)
      sel.removeAllRanges()
      sel.addRange(range)
    }
    el.oninput = () => {
      const text = el.textContent || ''
      if ([...text].length > 4) {
        const trimmed = [...text].slice(0, 4).join('')
        el.textContent = trimmed
        const sel = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
    el.onblur = () => {
      el.contentEditable = 'false'
      if (el.dataset.tabName === 'my') {
        state.myName = el.textContent?.trim() || '自分'
        saveState()
      } else {
        const i = parseInt(el.dataset.enemyIndex)
        const name = el.textContent?.trim() || `敵${i + 1}`
        setEnemyName(i, name)
      }
    }
    el.onkeydown = (e) => {
      if (e.key === 'Enter') { e.preventDefault(); el.blur() }
    }
  })
  const addEnemyBtn = document.querySelector('[data-action="addEnemy"]')
  addEnemyBtn?.addEventListener('click', addEnemy)
  addEnemyBtn?.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    addEnemyBtn.classList.add('drag-over')
  })
  addEnemyBtn?.addEventListener('dragleave', () => {
    addEnemyBtn.classList.remove('drag-over')
  })
  addEnemyBtn?.addEventListener('drop', (e) => {
    e.preventDefault()
    addEnemyBtn.classList.remove('drag-over')
    if (state.enemies.length >= 3) return
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      if (data.type !== 'card') return
      const fromArr = getArrForTarget(data.target)
      if (!fromArr) return
      const [card] = fromArr.splice(data.index, 1)
      const newEnemy = { name: `敵${state.enemies.length + 1}`, handCards: [card], bankCards: [] }
      state.enemies = [...state.enemies, newEnemy]
      state.currentTab = `enemy-${state.enemies.length - 1}`
      saveState()
      render()
    } catch (err) {}
  })
  document.querySelectorAll('[data-action="deleteEnemy"]').forEach((btn) => {
    btn.onclick = (e) => { e.stopPropagation(); deleteEnemy(parseInt(btn.dataset.enemyIndex)) }
  })
  document.querySelectorAll('[data-action="resetSyuyu"]').forEach((btn) => {
    btn.onclick = () => resetSyuyuAll(btn.dataset.target)
  })
  document.querySelectorAll('[data-action="convertSyuyu"]').forEach((btn) => {
    btn.onclick = () => convertSyuyuToNormal(btn.dataset.target)
  })
  document.querySelectorAll('[data-action="clearAll"]').forEach((btn) => {
    btn.onclick = () => { if (confirm('すべてのカードを削除しますか？')) clearAll(btn.dataset.target) }
  })
  document.querySelector('[data-action="changeSeries"]')?.addEventListener('click', () => {
    state.seriesId = null
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    render()
  })
  document.querySelector('[data-action="toggleCatalog"]')?.addEventListener('click', () => {
    state.catalogOpen = !state.catalogOpen
    const wrap = document.querySelector('.catalog-wrap')
    if (wrap) wrap.classList.toggle('open', state.catalogOpen)
    saveState()
  })

  const catalogWrap = document.querySelector('.catalog-wrap')
  if (catalogWrap) {
    let dragStartY = null
    let dragged = false
    const handle = catalogWrap.querySelector('.catalog-toggle')
    const onStart = (y) => {
      dragStartY = y
      dragged = false
    }
    const onMove = (y) => {
      if (dragStartY === null) return
      const delta = dragStartY - y
      if (Math.abs(delta) > 5) dragged = true
      if (!dragged) return
      if (!state.catalogOpen && delta > 20) {
        state.catalogOpen = true
        catalogWrap.classList.add('open')
        saveState()
        dragged = true
      } else if (state.catalogOpen && delta < -20) {
        state.catalogOpen = false
        catalogWrap.classList.remove('open')
        saveState()
        dragged = true
      }
    }
    const onEnd = () => {
      dragStartY = null
    }
    handle?.addEventListener('mousedown', (e) => { onStart(e.clientY) })
    document.addEventListener('mousemove', (e) => { if (dragStartY !== null) { e.preventDefault(); onMove(e.clientY) } })
    document.addEventListener('mouseup', onEnd)
    handle?.addEventListener('touchstart', (e) => { onStart(e.touches[0].clientY) }, { passive: true })
    document.addEventListener('touchmove', (e) => { if (dragStartY !== null) onMove(e.touches[0].clientY) }, { passive: true })
    document.addEventListener('touchend', onEnd)
  }

  let pickerTarget = null
  const overlay = document.querySelector('.picker-overlay')
  const openPicker = (target) => {
    pickerTarget = target
    overlay.style.display = 'flex'
  }
  const closePicker = () => {
    overlay.style.display = 'none'
    pickerTarget = null
  }
  document.querySelectorAll('[data-action="openPicker"]').forEach((el) => {
    el.onclick = () => openPicker(el.dataset.target)
  })
  document.querySelector('[data-action="closePicker"]')?.addEventListener('click', closePicker)
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closePicker()
  })
  document.querySelectorAll('.picker-card').forEach((btn) => {
    btn.onclick = () => {
      if (pickerTarget) addCard(btn.dataset.cardId, pickerTarget)
      closePicker()
    }
  })

  document.querySelectorAll('.card').forEach((cardEl) => {
    const target = cardEl.dataset.target
    const index = parseInt(cardEl.dataset.cardIndex)
    const arr = getArrForTarget(target)

    const isBank = target === 'myBank' || target.startsWith('enemyBank-')
    let cardHoldTimer = null
    let cardRepeatTimer = null
    let cardResetTimer = null
    let cardHolding = false
    let cardDidRepeat = false
    if (!isBank && getSyuyuDef(arr[index]?.id)) {
      const updateCardDisplay = () => {
        const card = arr[index]
        const syuyu = getSyuyuDef(card?.id)
        if (!card || !syuyu) return
        const used = card.max - card.remaining
        const numEl = cardEl.querySelector('.remaining-num')
        if (numEl) {
          numEl.textContent = String(used)
          numEl.classList.toggle('used-over-min', used >= syuyu.min)
        }
      }
      const clearCardTimers = () => {
        if (cardHoldTimer) { clearTimeout(cardHoldTimer); cardHoldTimer = null }
        if (cardRepeatTimer) { clearInterval(cardRepeatTimer); cardRepeatTimer = null }
        if (cardResetTimer) { clearTimeout(cardResetTimer); cardResetTimer = null }
      }
      const stopCardHold = () => {
        if (!cardHolding) return
        cardHolding = false
        clearCardTimers()
        cardEl.draggable = true
        if (!cardDidRepeat) {
          useSyuyu(arr, index)
        } else {
          render()
        }
      }
      const startDecrement = () => {
        cardEl.draggable = false
        if (undoUseSyuyu(arr, index, true)) { updateCardDisplay(); cardDidRepeat = true }
        cardRepeatTimer = setInterval(() => {
          if (!cardHolding || !undoUseSyuyu(arr, index, true)) { clearCardTimers(); if (cardHolding) { cardHolding = false; cardEl.draggable = true; render() }; return }
          updateCardDisplay()
        }, 500)
      }
      const startCardHold = (e) => {
        if (e.target.closest('button') || e.target.closest('[contenteditable="true"]') || e.target.closest('[data-action="editName"]')) return
        cardHolding = true
        cardDidRepeat = false
        cardResetTimer = setTimeout(() => {
          if (!cardHolding) return
          clearCardTimers()
          cardEl.draggable = false
          const card = arr[index]
          if (card) { card.remaining = card.max; cardDidRepeat = true; updateCardDisplay() }
        }, 3500)
        cardHoldTimer = setTimeout(() => {
          if (!cardHolding) return
          startDecrement()
        }, 1000)
      }
      cardEl.addEventListener('mousedown', startCardHold)
      cardEl.addEventListener('mouseup', stopCardHold)
      cardEl.addEventListener('mouseleave', stopCardHold)
      cardEl.addEventListener('click', (e) => { if (e.target.closest('button')) return; e.preventDefault() })
    }

    document.querySelectorAll(`[data-action="extend"][data-arr="${target}"][data-idx="${index}"]`).forEach((btn) => {
      btn.onclick = (e) => { e.stopPropagation(); extendSyuyu(arr, index) }
    })
    document.querySelectorAll(`[data-action="dabing"][data-arr="${target}"][data-idx="${index}"]`).forEach((btn) => {
      btn.onclick = (e) => { e.stopPropagation(); dabing(arr, index, target) }
    })
    document.querySelectorAll(`[data-action="remove"][data-arr="${target}"][data-idx="${index}"]`).forEach((btn) => {
      btn.onclick = (e) => { e.stopPropagation(); removeCard(arr, index, target) }
    })
    document.querySelectorAll(`[data-action="editName"][data-arr="${target}"][data-idx="${index}"]`).forEach((nameEl) => {
      nameEl.onclick = (e) => {
        e.stopPropagation()
        nameEl.contentEditable = 'true'
        nameEl.focus()
        const sel = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(nameEl)
        sel.removeAllRanges()
        sel.addRange(range)
      }
      nameEl.onblur = () => {
        nameEl.contentEditable = 'false'
        const text = nameEl.textContent?.trim()
        const def = getCardDef(arr[index]?.id, state.seriesId)
        arr[index].customName = text && text !== def?.name ? text : undefined
        saveState()
      }
      nameEl.onkeydown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); nameEl.blur() }
      }
    })
    document.querySelectorAll(`[data-action="undoTouch"][data-arr="${target}"][data-idx="${index}"]`).forEach((btn) => {
      btn.onclick = (e) => { e.stopPropagation(); undoUseSyuyu(arr, index) }
    })
    cardEl.addEventListener('dragstart', (e) => {
      if (cardHolding) {
        cardHolding = false
        if (cardHoldTimer) { clearTimeout(cardHoldTimer); cardHoldTimer = null }
        if (cardRepeatTimer) { clearInterval(cardRepeatTimer); cardRepeatTimer = null }
        if (cardResetTimer) { clearTimeout(cardResetTimer); cardResetTimer = null }
        if (cardDidRepeat) render()
        cardDidRepeat = false
      }
      e.dataTransfer.setData('application/json', JSON.stringify({ target, index, type: 'card' }))
      e.dataTransfer.effectAllowed = 'all'
      cardEl.classList.add('dragging')
      document.querySelector('.trash-zone')?.classList.add('visible')
    })
    cardEl.addEventListener('dragend', () => {
      cardEl.classList.remove('dragging')
      document.querySelector('.trash-zone')?.classList.remove('visible')
    })
  })

  function getHandTargetForTab(tabId) {
    if (tabId === 'my') return 'myHand'
    if (tabId?.startsWith('enemy-')) return `enemyHand-${tabId.split('-')[1]}`
    return null
  }

  function handleSpecialCardDrop(fromArr, fromIdx, dropZone, dropIdx) {
    const dragCard = fromArr[fromIdx]
    if (!dragCard) return false

    const toArr = getArrForTarget(dropZone)
    if (!toArr) return false

    const isFromHand = !fromArr._bankFlag
    const isToHand = dropZone === 'myHand' || dropZone.startsWith('enemyHand-')

    const fromTarget = Object.keys({myHand: state.myHand, myBank: state.myBank}).find(k => getArrForTarget(k) === fromArr)
      || state.enemies.reduce((r, e, i) => r || (e.handCards === fromArr ? `enemyHand-${i}` : null) || (e.bankCards === fromArr ? `enemyBank-${i}` : null), null)

    const sameHand = fromTarget === dropZone && isToHand

    if (sameHand && dropIdx >= 0 && dropIdx < toArr.length && fromIdx !== dropIdx) {
      const targetCard = toArr[dropIdx]
      if (!targetCard) return false

      if (dragCard.id === 'dabing' && targetCard.id !== 'dabing') {
        const copy = { ...targetCard }
        if (copy.max != null) copy.remaining = copy.max
        fromArr.splice(fromIdx, 1)
        const newIdx = fromIdx < dropIdx ? dropIdx - 1 : dropIdx
        toArr.splice(newIdx + 1, 0, copy)
        animateCard = { target: dropZone, index: newIdx + 1 }
        saveState(); render()
        return true
      }
      if (targetCard.id === 'dabing' && dragCard.id !== 'dabing') {
        const copy = { ...dragCard }
        if (copy.max != null) copy.remaining = copy.max
        const dabIdx = dropIdx
        toArr.splice(dabIdx, 1)
        const srcIdx = dabIdx < fromIdx ? fromIdx - 1 : fromIdx
        toArr.splice(srcIdx + 1, 0, copy)
        animateCard = { target: dropZone, index: srcIdx + 1 }
        saveState(); render()
        return true
      }

      if (dragCard.id === 'kikan-encho' && getSyuyuDef(targetCard.id)) {
        targetCard.remaining = targetCard.max
        fromArr.splice(fromIdx, 1)
        saveState(); render()
        return true
      }
      if (targetCard.id === 'kikan-encho' && getSyuyuDef(dragCard.id)) {
        dragCard.remaining = dragCard.max
        toArr.splice(dropIdx, 1)
        saveState(); render()
        return true
      }

      if (dragCard.id === 'kimigasubete' || targetCard.id === 'kimigasubete') {
        const baseCard = dragCard.id === 'kimigasubete' ? targetCard : dragCard
        const baseDef = getSyuyuDef(baseCard.id)
        toArr.length = 0
        for (let k = 0; k < 8; k++) {
          toArr.push({
            id: baseCard.id,
            remaining: baseDef ? baseDef.max : null,
            max: baseDef ? baseDef.max : null,
          })
        }
        saveState(); render()
        return true
      }
    }

    if (isToHand && fromTarget !== dropZone) {
      const fromIsBank = fromTarget === 'myBank' || (fromTarget && fromTarget.startsWith('enemyBank-'))
      if (fromIsBank && dropIdx >= 0 && dropIdx < toArr.length && toArr[dropIdx]?.id === 'cardbank') {
        const [moved] = fromArr.splice(fromIdx, 1)
        const cbIdx = dropIdx
        toArr.splice(cbIdx, 1)
        const insertAt = cbIdx > toArr.length ? toArr.length : cbIdx
        toArr.splice(insertAt, 0, moved)
        animateCard = { target: dropZone, index: insertAt }
        saveState(); render()
        return true
      }
    }

    return false
  }

  document.querySelectorAll('.tab[data-tab]').forEach((tab) => {
    tab.addEventListener('dragover', (e) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      tab.classList.add('drag-over')
    })
    tab.addEventListener('dragleave', () => {
      tab.classList.remove('drag-over')
    })
    tab.addEventListener('drop', (e) => {
      e.preventDefault()
      tab.classList.remove('drag-over')
      try {
        const data = JSON.parse(e.dataTransfer.getData('application/json'))
        if (data.type !== 'card') return
        const handTarget = getHandTargetForTab(tab.dataset.tab)
        if (!handTarget) return
        const fromArr = getArrForTarget(data.target)
        const toArr = getArrForTarget(handTarget)
        if (!fromArr || !toArr || fromArr === toArr) return
        const [card] = fromArr.splice(data.index, 1)
        toArr.push(card)
        saveState(); render()
      } catch (err) {}
    })
  })

  document.querySelectorAll('[data-drop-zone]').forEach((zone) => {
    const dropZone = zone.dataset.dropZone
    if (!dropZone) return

    const clearHighlights = () => {
      zone.querySelectorAll('.drag-over').forEach((el) => el.classList.remove('drag-over'))
      zone.querySelectorAll('.drag-target').forEach((el) => el.classList.remove('drag-target'))
    }

    zone.addEventListener('dragover', (e) => {
      e.preventDefault()
      if (dropZone === 'trash') {
        e.dataTransfer.dropEffect = 'move'
        return
      }
      const full = isTargetFull(dropZone)
      if (draggingFromCatalog && full) {
        e.dataTransfer.dropEffect = 'none'
        return
      }
      e.dataTransfer.dropEffect = draggingFromCatalog ? 'copy' : 'move'
      clearHighlights()
      const slotTarget = e.target.closest('.card-add-slot')
      if (slotTarget) slotTarget.classList.add('drag-over')
      const cardTarget = e.target.closest('.card')
      if (cardTarget) {
        const cardData = cardTarget.dataset
        const arr = getArrForTarget(cardData.target)
        const idx = parseInt(cardData.cardIndex)
        const card = arr?.[idx]
        if (card && (card.id === 'dabing' || card.id === 'kikan-encho' || card.id === 'kimigasubete' || card.id === 'cardbank')) {
          cardTarget.classList.add('drag-target')
          if (card.id === 'dabing') e.dataTransfer.dropEffect = 'copy'
        }
      }
    })
    zone.addEventListener('dragleave', (e) => {
      if (!zone.contains(e.relatedTarget)) clearHighlights()
    })
    zone.addEventListener('drop', (e) => {
      e.preventDefault()
      clearHighlights()
      try {
        const data = JSON.parse(e.dataTransfer.getData('application/json'))
        const dropIdx = getDropIndex(zone, e.clientX, e.clientY)
        if (data.type === 'card') {
          const fromArr = getArrForTarget(data.target)
          if (dropZone === 'trash') {
            removeCard(fromArr, data.index, data.target)
          } else {
            if (handleSpecialCardDrop(fromArr, data.index, dropZone, dropIdx)) return
            const toArr = getArrForTarget(dropZone)
            if (!fromArr || !toArr) return
            if (data.target === dropZone) {
              if (data.index !== dropIdx && data.index !== dropIdx - 1) {
                reorderCard(fromArr, data.index, dropIdx, dropZone)
              }
            } else {
              moveCard(fromArr, data.index, toArr, dropIdx >= 0 ? dropIdx : toArr.length, dropZone)
            }
          }
        } else if (data.type === 'catalog' && dropZone !== 'trash') {
          addCard(data.cardId, dropZone, dropIdx)
        }
      } catch (err) {}
    })
  })

  document.querySelectorAll('.catalog-card').forEach((el) => {
    el.addEventListener('dragstart', (e) => {
      draggingFromCatalog = true
      e.dataTransfer.setData('application/json', JSON.stringify({ type: 'catalog', cardId: el.dataset.cardId }))
      e.dataTransfer.effectAllowed = 'all'
    })
    el.addEventListener('dragend', () => { draggingFromCatalog = false })
  })

  document.querySelector('.trash-zone')?.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    e.currentTarget.classList.add('drag-over')
  })
  document.querySelector('.trash-zone')?.addEventListener('dragleave', (e) => {
    e.currentTarget.classList.remove('drag-over')
  })
  document.querySelector('.trash-zone')?.addEventListener('drop', (e) => {
    e.currentTarget.classList.remove('drag-over')
  })

}

export function initApp() {
  loadState()
  render()
}
