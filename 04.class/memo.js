module.exports = class Memo {
  static readline = require('readline')
  static Options = require('./memo_options')
  static DB = require('./memo_db')
  static Select = require('enquirer').Select

  static crud () {
    const memo = new this()
    memo.crud()
  }

  #options
  #db
  constructor () {
    this.#options = new Memo.Options()
    this.#db = new Memo.DB()
  }

  crud () {
    if (!this.#options.exist) {
      this.#create()
    } else if (this.#options.include('l')) {
      this.#printAll()
    } else if (this.#options.include('r')) {
      this.#read()
    } else if (this.#options.include('d')) {
      this.delete()
    }
  }

  async #create () {
    const memo = await this.#readMemo()
    const data = { memo }
    this.#db.insert(data)
  }

  async #readMemo () {
    const lines = []
    return new Promise(resolve => {
      const rl = Memo.readline.createInterface({
        input: process.stdin
      })
      rl.on('line', line => lines.push(line))
      rl.on('close', () => resolve(lines.join('\n')))
    })
  }

  async #printAll () {
    try {
      const memos = await this.#db.all()
      memos.forEach(memo => console.log(memo.memo.split('\n')[0]))
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  async #read () {
    try {
      const memos = await this.#db.all()
      const firstLines = memos.map(memo => memo.memo.split('\n')[0])
      const answer = await this.#selectMemo(firstLines.concat())
      const index = firstLines.indexOf(answer)
      console.log(memos[index].memo)
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  async #selectMemo (choices) {
    const prompt = new Memo.Select({
      name: 'memo',
      message: 'Choose a note you want to see',
      choices
    })

    return await prompt.run()
  }

  delete () {
    console.log('delete')
  }
}
