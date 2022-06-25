module.exports = class DB {
  static storage = './sqlite3.db'
  static sqlite3 = require('sqlite3').verbose()
  #db
  constructor () {
    this.#db = new DB.sqlite3.Database(DB.storage)
    this.#createTable()
  }

  #serialize (method) {
    this.#db.serialize(() => {
      method()
    })
  }

  #createTable () {
    const method = () => {
      this.#db.run('CREATE TABLE if not exists Memo (id INTEGER PRIMARY KEY AUTOINCREMENT, memo TEXT)')
    }
    this.#serialize(method)
  }
}
