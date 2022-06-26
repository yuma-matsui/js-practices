export class FetchHtml {
  constructor (url) {
    this.url = url
  }

  addEvent (event, targetEl) {
    targetEl.addEventListener(event, () => {
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
