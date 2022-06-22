import { FetchHtml } from './fetch_html.js'
import { AsyncFetchHtml } from './async_fetch_html.js'

window.addEventListener('DOMContentLoaded', () => {
  const btnAsync = document.getElementById('btn-async')
  const btnPromise = document.getElementById('btn-promise')
  const url = 'https://bootcamp.fjord.jp/'

  const fetchHtml = new FetchHtml(url, btnPromise)
  const asyncFetchHtml = new AsyncFetchHtml(url, btnAsync)
})
