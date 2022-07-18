import { CalendarOptions } from '../calendar_options'
import { CliOptions, YearAndMonth } from '../interface'

describe('CalendarOptionsクラス', () => {
  const options: CliOptions = { y: '', m: '' }
  const errorLog = jest.spyOn(console, 'log')
  const exit = jest.spyOn(process, 'exit').mockImplementation()

  describe('getter yearのテスト', () => {
    it('引数なしの場合今日の年を返す', () => {
      expect(new CalendarOptions(options).year).toBe(new Date().getFullYear())
    })

    it('引数が1~9999の整数の場合はその値を返す', () => {
      options.y = '1'
      expect(new CalendarOptions(options).year).toBe(1)

      options.y = '9999'
      expect(new CalendarOptions(options).year).toBe(9999)

      options.y = '2020'
      expect(new CalendarOptions(options).year).toBe(2020)
    })

    it('引数が0以下の場合はエラー文を出力してプログラムを終了する', () => {
      options.y = '0'
      new CalendarOptions(options).year
      expect(errorLog).toHaveBeenCalledWith(`cal: year \`${options.y}' not in range 1..9999`)
      expect(exit).toHaveBeenCalled()
    })

    it('引数が10000以上の場合はエラー文を出力してプログラムを終了する', () => {
      options.y = '10000'
      new CalendarOptions(options).year
      expect(errorLog).toHaveBeenCalledWith(`cal: year \`${options.y}' not in range 1..9999`)
      expect(exit).toHaveBeenCalled()
    })

    it('引数が数字以外の場合はエラー文を出力してプログラムを終了する', () => {
      options.y = 'string'
      new CalendarOptions(options).year
      expect(errorLog).toHaveBeenCalledWith(`cal: year \`${options.y}' not in range 1..9999`)
      expect(exit).toHaveBeenCalled()
    })
  })

  describe('getter monthのテスト', () => {
    it('引数なしの場合は今日の月を返す', () => {
      expect(new CalendarOptions(options).month).toBe(new Date().getMonth())
    })

    it('引数が1~12の場合はその値-1を返す', () => {
      options.m = '1'
      expect(new CalendarOptions(options).month).toBe(0)

      options.m = '12'
      expect(new CalendarOptions(options).month).toBe(11)
    })

    it('引数が1~12以外の場合はエラー文を出力してプログラムを終了する', () => {
      options.m = '0'
      new CalendarOptions(options).month
      expect(errorLog).toHaveBeenCalledWith(`cal: ${options.m} is neither a month number (1..12) nor a name`)
      expect(exit).toHaveBeenCalled()

      options.m = '13'
      new CalendarOptions(options).month
      expect(errorLog).toHaveBeenCalledWith(`cal: ${options.m} is neither a month number (1..12) nor a name`)
      expect(exit).toHaveBeenCalled()
    })

    it('引数が数字以外の場合はエラー文を出力してプログラムを終了する', () => {
      options.m = 'string'
      new CalendarOptions(options).month
      expect(errorLog).toHaveBeenCalledWith(`cal: ${options.m} is neither a month number (1..12) nor a name`)
      expect(exit).toHaveBeenCalled()
    })
  })

  describe('getter yearAndMonthのテスト', () => {
    it('year, monthプロパティをもつオブジェクトを返す', () => {
      const yearAndMonth: YearAndMonth = { year: 1, month: 1 }
      const calOptions = new CalendarOptions(options)

      expect(typeof calOptions.yearAndMonth).toBe(typeof yearAndMonth)
    })

    it('getter yearが一回よばれる', () => {
      const calOptions = new CalendarOptions(options)
      const getYear = jest.spyOn(calOptions, 'year', 'get')

      calOptions.yearAndMonth
      expect(getYear).toHaveBeenCalled()
    })

    it('getter monthが一回よばれる', () => {
      const calOptions = new CalendarOptions(options)
      const getMonth = jest.spyOn(calOptions, 'month', 'get')

      calOptions.yearAndMonth
      expect(getMonth).toHaveBeenCalled()
    })
  })
})
