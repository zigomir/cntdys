import { test } from 'zora'
import { calendarMonth, getDaysInMonth, getNextDay, getNextMonth, getPreviousDay, getPreviousMonth } from '../src/main.js'
import { DayEnum, IMonth, MonthEnum } from '../src/types'

test('get days in month', (t) => {
  t.is(getDaysInMonth(2016, 2), 29)
  t.is(getDaysInMonth(2017, 2), 28)
  t.is(getDaysInMonth(2017, 1), 31)
  t.is(getDaysInMonth(2017, 8), 31)
})

test('getPreviousMonth', (t) => {
  t.equal(getPreviousMonth(2016, 1), {
    month: 12,
    year: 2015,
  })

  t.equal(getPreviousMonth(2016, 2), {
    month: 1,
    year: 2016,
  })
})

test('getNextMonth', (t) => {
  t.equal(getNextMonth(2016, 12), {
    month: MonthEnum.January,
    year: 2017,
  })

  t.equal(getNextMonth(2016, 1), {
    month: MonthEnum.February,
    year: 2016,
  })
})

test('getPreviousDay', (t) => {
  t.equal(getPreviousDay(2016, 1, 1), {
    dayInMonth: 31,
    dayInWeek: DayEnum.Thursday,
    month: {
      month: MonthEnum.December,
      year: 2015,
    },
  })

  t.equal(getPreviousDay(2016, 6, 1), {
    dayInMonth: 31,
    dayInWeek: DayEnum.Tuesday,
    month: {
      month: MonthEnum.May,
      year: 2016,
    },
  })

  t.equal(getPreviousDay(2016, 1, 2), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Friday,
    month: {
      month: MonthEnum.January,
      year: 2016,
    },
  })

  t.equal(getPreviousDay(2016, 12, 31), {
    dayInMonth: 30,
    dayInWeek: DayEnum.Friday,
    month: {
      month: MonthEnum.December,
      year: 2016,
    },
  })
})

test('getNextDay', (t) => {
  t.equal(getNextDay(2016, 2, 29), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Tuesday,
    month: {
      month: MonthEnum.March,
      year: 2016,
    },
  })

  t.equal(getNextDay(2016, 6, 1), {
    dayInMonth: 2,
    dayInWeek: DayEnum.Thursday,
    month: {
      month: MonthEnum.June,
      year: 2016,
    },
  })

  t.equal(getNextDay(2016, 12, 31), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Sunday,
    month: {
      month: MonthEnum.January,
      year: 2017,
    },
  })

  t.equal(getNextDay(2016, 2, 28), {
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: {
      month: MonthEnum.February,
      year: 2016,
    },
  })

  t.equal(getNextDay(2017, 2, 28), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Wednesday,
    month: {
      month: MonthEnum.March,
      year: 2017,
    },
  })
})

test('march 2016', (t) => {
  const month: IMonth = { month: 3, year: 2016 }
  const prevMonth = getPreviousMonth(month.year, month.month)
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month, DayEnum.Monday)
  const numberOfWeeks = calendar.length

  t.is(numberOfWeeks, 6)
  for (let i = 0; i < numberOfWeeks; i++) {
    t.is(calendar[i].length, 7)
  }
  t.is(calendar[5][7], undefined)
  t.equal(calendar[0][0], {
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: prevMonth,
  })
  t.equal(calendar[0][1], {
    dayInMonth: 1,
    dayInWeek: DayEnum.Tuesday,
    month,
  })
  t.equal(calendar[0][2], {
    dayInMonth: 2,
    dayInWeek: DayEnum.Wednesday,
    month,
  })
  t.equal(calendar[0][6], {
    dayInMonth: 6,
    dayInWeek: DayEnum.Sunday,
    month,
  })
  t.equal(calendar[2][3], {
    dayInMonth: 17,
    dayInWeek: DayEnum.Thursday,
    month,
  })
  t.equal(calendar[5][6], {
    dayInMonth: 10,
    dayInWeek: DayEnum.Sunday,
    month: nextMonth,
  })
})

test('june 2017', (t) => {
  const month: IMonth = { month: 6, year: 2017 }
  const prevMonth = getPreviousMonth(month.year, month.month)
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month, DayEnum.Monday)

  t.equal(calendar[0][0], {
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: prevMonth,
  })
  t.equal(calendar[0][1], {
    dayInMonth: 30,
    dayInWeek: DayEnum.Tuesday,
    month: prevMonth,
  })
  t.equal(calendar[0][2], {
    dayInMonth: 31,
    dayInWeek: DayEnum.Wednesday,
    month: prevMonth,
  })
  t.equal(calendar[0][3], {
    dayInMonth: 1,
    dayInWeek: DayEnum.Thursday,
    month,
  })
  t.equal(calendar[2][3], {
    dayInMonth: 15,
    dayInWeek: DayEnum.Thursday,
    month,
  })
  t.equal(calendar[5][6], {
    dayInMonth: 9,
    dayInWeek: DayEnum.Sunday,
    month: nextMonth,
  })
})

test('calendarMonth has days in right order', (t) => {
  const calendar = calendarMonth(2017, 6, DayEnum.Monday)
  /* tslint:disable:prefer-for-of */
  for (let i = 0; i < calendar.length; i++) {
    t.is(calendar[i].length, 7)
    /* tslint:disable:prefer-for-of */
    for (let j = 0; j < calendar[i].length; j++) {
      t.is(calendar[i][j].dayInWeek, j < 6 ? j + 1 : 0)
      t.ok(calendar[i][j].dayInMonth >= 1)
      t.ok(calendar[i][j].dayInMonth <= 31)
    }
  }
})

test('oct 2017', (t) => {
  const month: IMonth = { month: 10, year: 2017 }
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month)

  t.equal(calendar[0][0], {
    dayInMonth: 1,
    dayInWeek: DayEnum.Sunday,
    month,
  })

  t.equal(calendar[5][6], {
    dayInMonth: 11,
    dayInWeek: DayEnum.Saturday,
    month: nextMonth,
  })
})
