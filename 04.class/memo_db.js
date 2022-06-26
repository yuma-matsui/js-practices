module.exports = class MemoDB {
  static storage = './sqlite3.db'
  static sqlite3 = require('sqlite3').verbose()
  static createTableStatement = 'CREATE TABLE if not exists Memo (id INTEGER PRIMARY KEY AUTOINCREMENT, memo TEXT)'
  static insertStatement = 'INSERT INTO Memo (memo) VALUES (?)'
  static selectAllStatement = 'SELECT * FROM Memo'

  #db
  constructor () {
    this.#db = new MemoDB.sqlite3.Database(MemoDB.storage)
    this.#createTable(MemoDB.createTableStatement)
  }

  #createTable (createTableStatement) {
    const method = () => {
      this.#db.run(createTableStatement)
    }
    this.#serialize(method)
  }

  #serialize (method) {
    this.#db.serialize(() => {
      method()
    })
  }

  insert ({ memo }) {
    const method = () => {
      const statement = this.#db.prepare(MemoDB.insertStatement)
      statement.run(memo)
      statement.finalize()
    }
    this.#executeSql(method)
  }

  async all () {
    return new Promise(resolve => {
      const method = () => {
        this.#db.all(MemoDB.selectAllStatement, (error, memos) => {
          if (error) {
            throw Error(error)
          }
          resolve(memos)
        })
      }
      this.#executeSql(method)
    })
  }

  #executeSql (method) {
    this.#serialize(method)
    this.#db.close()
  }
}
