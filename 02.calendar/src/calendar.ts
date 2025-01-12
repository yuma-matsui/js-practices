import { CalendarOptions } from './calendar_options.js'
import { YearAndMonth } from './interface.js'
import { OptionParser } from './option_parser.js'

export class Calendar {
  // 日にち出力時の整形用
  static pad_num = 4

  static week = ['日', '月', '火', '水', '木', '金', '土']

  // 出力文字色反転用
  static colorReverse = '\x1b[7m'
  static colorReset = '\x1b[0m'

  readonly #targetCalendar

  static print () {
    const calendar = new this(new CalendarOptions(new OptionParser().options).yearAndMonth)
    calendar.print()
  }

  constructor ({ year, month }: YearAndMonth) {
    this.#targetCalendar = new Date(year, month)
  }

  get year () {
    return this.#targetCalendar.getFullYear()
  }

  get month () {
    return this.#targetCalendar.getMonth()
  }

  get lastDate () {
    return new Date(this.year, this.month + 1, 0).getDate()
  }

  get targetDays () {
    const days: Date[] = []
    for (let date = 1; date <= this.lastDate; date++) {
      const day = new Date(this.year, this.month, date)
      days.push(day)
    }
    return days
  }

  print () {
    this.#print_header()
    this.#print_week()
    this.#print_calendar()
  }

  #print_header () {
    console.log(`${this.month + 1}月 ${this.year}`.padStart(18))
  }

  #print_week () {
    // 余白の調整
    const printWeek = Calendar.week.map(week => week.padStart(3))
    console.log(printWeek.join(''))
  }

  #print_calendar () {
    this.targetDays.forEach(day => {
      this.#first_week_format(day)
      process.stdout.write(this.#today_or_another_day(day))

      // 日にちが土曜日の場合に改行
      if ((day.getDay() === 6) || (day.getDate() === this.lastDate)) console.log()
    })
  }

  #first_week_format (day: Date) {
    if (day.getDate() === 1) {
      for (let index = 0; index < day.getDay(); index++) {
        process.stdout.write('  '.padStart(Calendar.pad_num))
      }
    }
  }

  #today_or_another_day (day: Date) {
    const date = day.getDate()
    const dateString = String(date)
    return this.#isToday(day)
      ? (this.#insertSpaceForReverse(date) + Calendar.colorReverse + dateString + Calendar.colorReset)
      : dateString.padStart(Calendar.pad_num)
  }

  #isToday (targetDay: Date) {
    const targetYear = targetDay.getFullYear()
    const targetMonth = targetDay.getMonth()
    const targetDate = targetDay.getDate()

    return (targetYear === new Date().getFullYear()) &&
    (targetMonth === new Date().getMonth()) &&
    (targetDate === new Date().getDate())
  }

  #insertSpaceForReverse (date: number) {
    return date < 10
      ? '   '
      : '  '
  }
}
