module.exports = class Memo {
  static readline = require('readline')
  static Options = require('./memo_options')
  static DB = require('./memo_db')

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
      this.create()
    } else if (this.#options.include('l')) {
      this.printAll()
    } else if (this.#options.include('r')) {
      this.read()
    } else if (this.#options.include('d')) {
      this.delete()
    }
  }

  async create () {
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

  async printAll () {
    try {
      const memos = await this.#db.all()
      memos.forEach(memo => console.log(memo.memo.split('\n')[0]))
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  read () {
    console.log('read')
  }

  delete () {
    console.log('delete')
  }
}
