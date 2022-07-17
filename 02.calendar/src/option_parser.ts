import { program } from 'commander'
import { CliOptions } from './interface.js'

export class OptionParser {
  readonly #args: CliOptions
  constructor () {
    program
      .option('-y, --y <integer>')
      .option('-m, --m <integer>')
      .parse(process.argv)
    this.#args = program.opts()
  }

  get options (): CliOptions {
    return this.#args
  }
}
