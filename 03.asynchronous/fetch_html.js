export class FetchHtml {
  constructor (url, targetEl) {
    this.url = url
    this.targetEl = targetEl
    this.addEvent('click')
  }

  addEvent (event) {
    this.targetEl.addEventListener(event, () => {
      this.printHtml()
    })
  }

  get HTMLPromise () {
    return fetch(this.url)
  }

  printHtml () {
    this.HTMLPromise
      .then(response => {
        response.text()
          .then(html => {
            console.log(html)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
