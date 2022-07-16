module.exports = class CalendarOptions {
  #args
  constructor (args) {
    this.#args = args
    delete this.#args._
  }

  get year () {
    if (!this.#args.y) return new Date().getFullYear()

    try {
      if (typeof this.#args.y === 'string') {
        throw new Error(`cal: year \`${this.#args.y}' not in range 1..9999`)
      } else {
        return this.#args.y
      }
    } catch (error) {
      console.log(error.message)
      process.exit(1)
    }
  }

  // 0..11を返す
  get month () {
    // 引数なしの場合
    if (!this.#args.m) return new Date().getMonth()

    try {
      if ((this.#args.m > 0) && (this.#args.m < 13)) {
        return this.#args.m - 1
      } else {
        throw new Error(`cal: ${this.#args.m} is neither a month number (1..12) nor a name`)
      }
    } catch (error) {
      console.log(error.message)
      process.exit(1)
    }
  }

  get yearAndMonth () {
    return {
      year: this.year,
      month: this.month
    }
  }
}
