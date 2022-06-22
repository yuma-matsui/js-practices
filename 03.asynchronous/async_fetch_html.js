import { FetchHtml } from './fetch_html.js'

export class AsyncFetchHtml extends FetchHtml {
  async printHTML () {
    try {
      const response = await fetch(this.url)
      const html = await response.text()
      console.log(html)
    } catch (error) {
      console.log(error)
    }
  }
}
