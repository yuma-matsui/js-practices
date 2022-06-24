module.exports = class MemoOptions {
  #args = require('minimist')(process.argv.slice(2))

  constructor () {
    delete this.#args._
  }

  get all () {
    return this.#args
  }

  get exist () {
    return Object.keys(this.#args).length !== 0
  }
}
