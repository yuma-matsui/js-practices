import { FetchHtml } from './fetch_html.js'
import { AsyncFetchHtml } from './async_fetch_html.js'

window.addEventListener('DOMContentLoaded', () => {
  const btnPromise = document.getElementById('btn-promise')
  const btnAsync = document.getElementById('btn-async')

  const url = 'https://bootcamp.fjord.jp/'

  const fetchHtml = new FetchHtml(url)
  const asyncFetchHtml = new AsyncFetchHtml(url)

  btnPromise.addEventListener('click', () => {
    fetchHtml.printHtml()
  })

  btnAsync.addEventListener('click', () => {
    asyncFetchHtml.printHtml()
  })
})
