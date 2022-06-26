module.exports = class MemoDB {
  static storage = './sqlite3.db'
  static sqlite3 = require('sqlite3').verbose()
  static createTableStatement = 'CREATE TABLE if not exists Memo (id INTEGER PRIMARY KEY AUTOINCREMENT, memo TEXT)'
  static insertStatement = 'INSERT INTO Memo (memo) VALUES (?)'
  static selectAllStatement = 'SELECT * FROM Memo'
  static deleteStatement = 'DELETE FROM Memo WHERE id = (?)'

  #db
  constructor () {
    this.#db = new MemoDB.sqlite3.Database(MemoDB.storage)
    this.#createTable(MemoDB.createTableStatement)
  }

  close () {
    this.#db.close()
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
    this.#serialize(method)
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
      this.#serialize(method)
    })
  }

  delete ({ id }) {
    const method = () => {
      const statement = this.#db.prepare(MemoDB.deleteStatement)
      statement.run(id)
      statement.finalize()
    }
    this.#serialize(method)
  }
}
