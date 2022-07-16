const CalendarOptions = require('./calendar_options')

describe('CalendarOptionsクラス', () => {
  const args = {}
  const errorLog = jest.spyOn(console, 'log')
  const processExit = jest.spyOn(process, 'exit').mockImplementation(() => {})

  describe('getter yearのテスト', () => {
    it('オプション引数なしの場合今日の年を返す', () => {
      const options = new CalendarOptions(args)
      expect(options.year).toBe(new Date().getFullYear())
    })

    it('オプション引数が正の整数の場合はその値を返す', () => {
      const args = { y: 2000 }
      const options = new CalendarOptions(args)
      expect(options.year).toBe(2000)
    })

    it('オプション引数が文字列の場合はエラー文を出力してプログラムを終了する', () => {
      const args = { y: 'hoge' }
      const options = new CalendarOptions(args)

      expect(options.year).toBeUndefined()
      expect(errorLog).toHaveBeenCalledWith(`cal: year \`${args.y}' not in range 1..9999`)
      expect(processExit).toHaveBeenCalled()
    })
  })

  describe('getter monthのテスト', () => {
    it('オプション引数なしの場合は今日の月を返す', () => {
      const options = new CalendarOptions(args)
      expect(options.month).toBe(new Date().getMonth())
    })

    it('オプション引数が1~12の場合はその値-1を返す', () => {
      const args = { m: 1 }
      const options = new CalendarOptions(args)
      expect(options.month).toBe(0)

      args.m = 12
      const options2 = new CalendarOptions(args)
      expect(options2.month).toBe(11)
    })

    it('オプション引数が1~12以外の数値の場合はエラー文を出力してプログラムを終了する', () => {
      const args = { m: 13 }
      const options = new CalendarOptions(args)

      expect(options.month).toBeUndefined()
      expect(errorLog).toHaveBeenCalledWith(`cal: ${args.m} is neither a month number (1..12) nor a name`)
      expect(processExit).toHaveBeenCalled()
    })

    it('オプション引数が文字列の場合はエラー文を出力してプログラムを終了する', () => {
      const args = { m: 'hoge' }
      const options = new CalendarOptions(args)

      expect(options.month).toBeUndefined()
      expect(errorLog).toHaveBeenCalledWith(`cal: ${args.m} is neither a month number (1..12) nor a name`)
      expect(processExit).toHaveBeenCalled()
    })
  })

  describe('getter yearAndMonthのテスト', () => {
    it('year, monthプロパティをもつオブジェクトを返す', () => {
      const yearAndMonthKeys = ['year', 'month']

      const options = new CalendarOptions(args)
      const spy1 = jest.spyOn(options, 'year', 'get')
      const spy2 = jest.spyOn(options, 'month', 'get')

      expect(Object.keys(options.yearAndMonth)).toEqual(yearAndMonthKeys)
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()
    })
  })
})
