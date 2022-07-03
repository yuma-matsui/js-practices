module.exports = class MemoOptions {
  #args = require('minimist')(process.argv.slice(2))

  constructor () {
    delete this.#args._
  }

  get size () {
    return Object.keys(this.#args).length
  }

  get exist () {
    return this.size !== 0
  }

  include (option) {
    return (this.size === 1) && this.#args[option]
  }
}
