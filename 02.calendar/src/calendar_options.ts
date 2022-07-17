import { CliOptions, YearAndMonth } from './interface.js'

export class CalendarOptions {
  readonly #args: CliOptions
  constructor (args: CliOptions) {
    this.#args = args
  }

  #isInvalidYear (year: number): boolean {
    return Number.isNaN(year) || (year > 9999) || (year < 1)
  }

  get year () {
    if (this.#args.y === '') return new Date().getFullYear()
    const year = Number(this.#args.y)

    try {
      if (this.#isInvalidYear(year)) {
        throw new Error(`cal: year \`${this.#args.y}' not in range 1..9999`)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        process.exit(1)
      }
    }
    return year
  }

  #isInvalidMonth (month: number): boolean {
    return Number.isNaN(month) || (month <= 0) || (month >= 13)
  }

  // 0..11を返す
  get month () {
    if (this.#args.m === '') return new Date().getMonth()

    const month = Number(this.#args.m)
    try {
      if (this.#isInvalidMonth(month)) {
        throw new Error(`cal: ${this.#args.m} is neither a month number (1..12) nor a name`)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        process.exit(1)
      }
    }
    return month - 1
  }

  get yearAndMonth (): YearAndMonth {
    return {
      year: this.year,
      month: this.month
    }
  }
}
