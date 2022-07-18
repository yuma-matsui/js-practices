import { Calendar } from '../calendar'
import { YearAndMonth } from '../interface'

describe('Calendar', () => {
  const yearAndMonth: YearAndMonth = {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  }

  describe('static printのテスト', () => {
    it('インスタンスメソッドのprintが呼ばれる', () => {
      const spy = jest.spyOn(Calendar, 'print')
      expect(Calendar.print()).toBeUndefined()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('getter yearのテスト', () => {
    it('引数に受け取ったyearAndMonthオブジェクトのyearの値を返す', () => {
      const cal = new Calendar(yearAndMonth)
      expect(cal.year).toBe(yearAndMonth.year)
    })
  })

  describe('getter monthのテスト', () => {
    it('引数に受け取ったyearAndMonthオブジェクトのmonthの値を返す', () => {
      const cal = new Calendar(yearAndMonth)
      expect(cal.month).toBe(yearAndMonth.month)
    })
  })

  describe('getter lastDateのテスト', () => {
    it('get monthが呼ばれる', () => {
      const cal = new Calendar(yearAndMonth)
      const spy = jest.spyOn(cal, 'month', 'get')
      cal.lastDate
      expect(spy).toHaveBeenCalled()
    })

    it('get yearが呼ばれる', () => {
      const cal = new Calendar(yearAndMonth)
      const spy = jest.spyOn(cal, 'year', 'get')
      cal.lastDate
      expect(spy).toHaveBeenCalled()
    })

    it('コンストラクタ引数のyearAndMonthオブジェクトと同月の最終日を返す', () => {
      const cal = new Calendar(yearAndMonth)
      const lastDate = new Date(yearAndMonth.year, yearAndMonth.month + 1, 0).getDate()
      expect(cal.lastDate).toBe(lastDate)
    })
  })

  describe('getter targetDaysのテスト', () => {
    it('コンストラクタ引数のyearAndMonthオブジェクトと同月最終日と同じ数の要素を持つ配列を返す', () => {
      const cal = new Calendar(yearAndMonth)
      const lastDate = new Date(yearAndMonth.year, yearAndMonth.month + 1, 0).getDate()
      expect(cal.targetDays.length).toBe(lastDate)
    })

    it('要素が全てDateオブジェクトの配列を返す', () => {
      for (const day of new Calendar(yearAndMonth).targetDays) {
        expect(day instanceof Date).toBeTruthy()
      }
    })

    it('要素が全てyearAndMonthオブジェクトのmonthと同じ月のDateオブジェクトの配列を返す', () => {
      for (const day of new Calendar(yearAndMonth).targetDays) {
        expect(day.getMonth()).toBe(yearAndMonth.month)
      }
    })

    it('getter lastDateが呼ばれる', () => {
      const cal = new Calendar(yearAndMonth)
      const spy = jest.spyOn(cal, 'lastDate', 'get')
      cal.targetDays
      expect(spy).toHaveBeenCalled()
    })

    it('getter yearが呼ばれる', () => {
      const cal = new Calendar(yearAndMonth)
      const spy = jest.spyOn(cal, 'year', 'get')
      cal.targetDays
      expect(spy).toHaveBeenCalled()
    })

    it('getter monthが呼ばれる', () => {
      const cal = new Calendar(yearAndMonth)
      const spy = jest.spyOn(cal, 'month', 'get')
      cal.targetDays
      expect(spy).toHaveBeenCalled()
    })
  })
})
