import { assert, assertEquals } from '@std/assert'

import {
  calendarMonth,
  getDaysInMonth,
  getNextDay,
  getNextMonth,
  getPreviousDay,
  getPreviousMonth,
} from './main.ts'
import { DayEnum, IMonth, MonthEnum } from './types.ts'

Deno.test('get days in month', () => {
  assertEquals(getDaysInMonth(2016, 2), 29)
  assertEquals(getDaysInMonth(2017, 2), 28)
  assertEquals(getDaysInMonth(2017, 1), 31)
  assertEquals(getDaysInMonth(2017, 8), 31)
})

Deno.test('getPreviousMonth', () => {
  assertEquals(getPreviousMonth(2016, 1), {
    month: 12,
    year: 2015,
  })

  assertEquals(getPreviousMonth(2016, 2), {
    month: 1,
    year: 2016,
  })
})

Deno.test('getNextMonth', () => {
  assertEquals(getNextMonth(2016, 12), {
    month: MonthEnum.January,
    year: 2017,
  })

  assertEquals(getNextMonth(2016, 1), {
    month: MonthEnum.February,
    year: 2016,
  })
})

Deno.test('getPreviousDay', () => {
  assertEquals(getPreviousDay(2016, 1, 1), {
    dayInMonth: 31,
    dayInWeek: DayEnum.Thursday,
    month: {
      month: MonthEnum.December,
      year: 2015,
    },
  })

  assertEquals(getPreviousDay(2016, 6, 1), {
    dayInMonth: 31,
    dayInWeek: DayEnum.Tuesday,
    month: {
      month: MonthEnum.May,
      year: 2016,
    },
  })

  assertEquals(getPreviousDay(2016, 1, 2), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Friday,
    month: {
      month: MonthEnum.January,
      year: 2016,
    },
  })

  assertEquals(getPreviousDay(2016, 12, 31), {
    dayInMonth: 30,
    dayInWeek: DayEnum.Friday,
    month: {
      month: MonthEnum.December,
      year: 2016,
    },
  })
})

Deno.test('getNextDay', () => {
  assertEquals(getNextDay(2016, 2, 29), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Tuesday,
    month: {
      month: MonthEnum.March,
      year: 2016,
    },
  })

  assertEquals(getNextDay(2016, 6, 1), {
    dayInMonth: 2,
    dayInWeek: DayEnum.Thursday,
    month: {
      month: MonthEnum.June,
      year: 2016,
    },
  })

  assertEquals(getNextDay(2016, 12, 31), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Sunday,
    month: {
      month: MonthEnum.January,
      year: 2017,
    },
  })

  assertEquals(getNextDay(2016, 2, 28), {
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: {
      month: MonthEnum.February,
      year: 2016,
    },
  })

  assertEquals(getNextDay(2017, 2, 28), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Wednesday,
    month: {
      month: MonthEnum.March,
      year: 2017,
    },
  })
})

Deno.test('march 2016', () => {
  const month: IMonth = { month: 3, year: 2016 }
  const prevMonth = getPreviousMonth(month.year, month.month)
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month, DayEnum.Monday)
  const numberOfWeeks = calendar.length

  assertEquals(numberOfWeeks, 6)
  for (let i = 0; i < numberOfWeeks; i++) {
    assertEquals(calendar[i].length, 7)
  }
  assertEquals(calendar[5][7], undefined)
  assertEquals(calendar[0][0], {
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: prevMonth,
  })
  assertEquals(calendar[0][1], {
    dayInMonth: 1,
    dayInWeek: DayEnum.Tuesday,
    month,
  })
  assertEquals(calendar[0][2], {
    dayInMonth: 2,
    dayInWeek: DayEnum.Wednesday,
    month,
  })
  assertEquals(calendar[0][6], {
    dayInMonth: 6,
    dayInWeek: DayEnum.Sunday,
    month,
  })
  assertEquals(calendar[2][3], {
    dayInMonth: 17,
    dayInWeek: DayEnum.Thursday,
    month,
  })
  assertEquals(calendar[5][6], {
    dayInMonth: 10,
    dayInWeek: DayEnum.Sunday,
    month: nextMonth,
  })
})

Deno.test('june 2017', () => {
  const month: IMonth = { month: 6, year: 2017 }
  const prevMonth = getPreviousMonth(month.year, month.month)
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month, DayEnum.Monday)

  assertEquals(calendar[0][0], {
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: prevMonth,
  })
  assertEquals(calendar[0][1], {
    dayInMonth: 30,
    dayInWeek: DayEnum.Tuesday,
    month: prevMonth,
  })
  assertEquals(calendar[0][2], {
    dayInMonth: 31,
    dayInWeek: DayEnum.Wednesday,
    month: prevMonth,
  })
  assertEquals(calendar[0][3], {
    dayInMonth: 1,
    dayInWeek: DayEnum.Thursday,
    month,
  })
  assertEquals(calendar[2][3], {
    dayInMonth: 15,
    dayInWeek: DayEnum.Thursday,
    month,
  })
  assertEquals(calendar[5][6], {
    dayInMonth: 9,
    dayInWeek: DayEnum.Sunday,
    month: nextMonth,
  })
})

Deno.test('calendarMonth has days in right order', () => {
  const calendar = calendarMonth(2017, 6, DayEnum.Monday)
  for (let i = 0; i < calendar.length; i++) {
    assertEquals(calendar[i].length, 7)
    for (let j = 0; j < calendar[i].length; j++) {
      assertEquals(calendar[i][j].dayInWeek, j < 6 ? j + 1 : 0)
      assert(calendar[i][j].dayInMonth >= 1)
      assert(calendar[i][j].dayInMonth <= 31)
    }
  }
})

Deno.test('oct 2017', () => {
  const month: IMonth = { month: 10, year: 2017 }
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month)

  assertEquals(calendar[0][0], {
    dayInMonth: 1,
    dayInWeek: DayEnum.Sunday,
    month,
  })

  assertEquals(calendar[5][6], {
    dayInMonth: 11,
    dayInWeek: DayEnum.Saturday,
    month: nextMonth,
  })
})
