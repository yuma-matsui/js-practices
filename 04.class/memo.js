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
      this.#delete()
    }
  }

  async #create () {
    try {
      const memo = await this.#readMemo()
      const data = { memo }
      this.#db.insert(data)
    } catch (error) {
      console.log(error)
      process.exit(1)
    } finally {
      this.#db.close()
    }
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
    } finally {
      this.#db.close()
    }
  }

  async #read () {
    try {
      const memos = await this.#db.all()
      const target = await this.#identifyMemo(memos, 'see')
      console.log(memos[target].memo)
    } catch (error) {
      console.log(error)
      process.exit(1)
    } finally {
      this.#db.close()
    }
  }

  async #selectMemo (choices, action) {
    const prompt = new Memo.Select({
      name: 'memo',
      message: `Choose a note you want to ${action}`,
      choices
    })

    return await prompt.run()
  }

  async #delete () {
    try {
      const memos = await this.#db.all()
      const target = await this.#identifyMemo(memos, 'delete')
      this.#db.delete(memos[target])
    } catch (error) {
      console.log(error)
      process.exit(1)
    } finally {
      this.#db.close()
    }
  }

  async #identifyMemo (memos, action) {
    const firstLines = memos.map(memo => memo.memo.split('\n')[0])
    const targetMemo = await this.#selectMemo(firstLines.concat(), action)
    return firstLines.indexOf(targetMemo)
  }
}
