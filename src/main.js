import './style.css'
import { initApp } from './app.js'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

document.addEventListener('gesturestart', (e) => e.preventDefault())
document.addEventListener('gesturechange', (e) => e.preventDefault())
document.addEventListener('gestureend', (e) => e.preventDefault())
document.addEventListener('dblclick', (e) => e.preventDefault())

initApp()
