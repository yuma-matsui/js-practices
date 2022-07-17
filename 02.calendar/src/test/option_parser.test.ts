import { CliOptions } from '../interface'
import { OptionParser } from '../option_parser'

describe('OptionParserクラス', () => {
  const op = new OptionParser()

  describe('OptionParser#options', () => {
    it('CliOptionsインターフェースを備えたオブジェクトを返す', () => {
      const cliOptions: CliOptions = { y: '', m: '' }
      expect(typeof op.options).toBe(typeof cliOptions)
    })

    it('yオプションなしの場合空文字を返す', () => {
      expect(op.options.y).toBe('')
    })

    it('mオプションなしの場合空文字を返す', () => {
      expect(op.options.m).toBe('')
    })
  })
})
