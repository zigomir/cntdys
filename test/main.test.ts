import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { calendarMonth, getDaysInMonth, getNextDay, getNextMonth, getPreviousDay, getPreviousMonth } from '../src/main'
import { DayEnum, IMonth, MonthEnum } from '../src/types'

test('get days in month', () => {
  assert.is(getDaysInMonth(2016, 2), 29)
  assert.is(getDaysInMonth(2017, 2), 28)
  assert.is(getDaysInMonth(2017, 1), 31)
  assert.is(getDaysInMonth(2017, 8), 31)
})

test('getPreviousMonth', () => {
  assert.equal(getPreviousMonth(2016, 1), {
    month: 12,
    year: 2015,
  })

  assert.equal(getPreviousMonth(2016, 2), {
    month: 1,
    year: 2016,
  })
})

test('getNextMonth', () => {
  assert.equal(getNextMonth(2016, 12), {
    month: MonthEnum.January,
    year: 2017,
  })

  assert.equal(getNextMonth(2016, 1), {
    month: MonthEnum.February,
    year: 2016,
  })
})

test('getPreviousDay', () => {
  assert.equal(getPreviousDay(2016, 1, 1), {
    dayInMonth: 31,
    dayInWeek: DayEnum.Thursday,
    month: {
      month: MonthEnum.December,
      year: 2015,
    },
  })

  assert.equal(getPreviousDay(2016, 6, 1), {
    dayInMonth: 31,
    dayInWeek: DayEnum.Tuesday,
    month: {
      month: MonthEnum.May,
      year: 2016,
    },
  })

  assert.equal(getPreviousDay(2016, 1, 2), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Friday,
    month: {
      month: MonthEnum.January,
      year: 2016,
    },
  })

  assert.equal(getPreviousDay(2016, 12, 31), {
    dayInMonth: 30,
    dayInWeek: DayEnum.Friday,
    month: {
      month: MonthEnum.December,
      year: 2016,
    },
  })
})

test('getNextDay', () => {
  assert.equal(getNextDay(2016, 2, 29), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Tuesday,
    month: {
      month: MonthEnum.March,
      year: 2016,
    },
  })

  assert.equal(getNextDay(2016, 6, 1), {
    dayInMonth: 2,
    dayInWeek: DayEnum.Thursday,
    month: {
      month: MonthEnum.June,
      year: 2016,
    },
  })

  assert.equal(getNextDay(2016, 12, 31), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Sunday,
    month: {
      month: MonthEnum.January,
      year: 2017,
    },
  })

  assert.equal(getNextDay(2016, 2, 28), {
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: {
      month: MonthEnum.February,
      year: 2016,
    },
  })

  assert.equal(getNextDay(2017, 2, 28), {
    dayInMonth: 1,
    dayInWeek: DayEnum.Wednesday,
    month: {
      month: MonthEnum.March,
      year: 2017,
    },
  })
})

test('march 2016', () => {
  const month: IMonth = { month: 3, year: 2016 }
  const prevMonth = getPreviousMonth(month.year, month.month)
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month, DayEnum.Monday)
  const numberOfWeeks = calendar.length

  assert.is(numberOfWeeks, 6)
  for (let i = 0; i < numberOfWeeks; i++) {
    assert.is(calendar[i].length, 7)
  }
  assert.is(calendar[5][7], undefined)
  assert.equal(calendar[0][0], {
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: prevMonth,
  })
  assert.equal(calendar[0][1], {
    dayInMonth: 1,
    dayInWeek: DayEnum.Tuesday,
    month,
  })
  assert.equal(calendar[0][2], {
    dayInMonth: 2,
    dayInWeek: DayEnum.Wednesday,
    month,
  })
  assert.equal(calendar[0][6], {
    dayInMonth: 6,
    dayInWeek: DayEnum.Sunday,
    month,
  })
  assert.equal(calendar[2][3], {
    dayInMonth: 17,
    dayInWeek: DayEnum.Thursday,
    month,
  })
  assert.equal(calendar[5][6], {
    dayInMonth: 10,
    dayInWeek: DayEnum.Sunday,
    month: nextMonth,
  })
})

test('june 2017', () => {
  const month: IMonth = { month: 6, year: 2017 }
  const prevMonth = getPreviousMonth(month.year, month.month)
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month, DayEnum.Monday)

  assert.equal(calendar[0][0], {
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: prevMonth,
  })
  assert.equal(calendar[0][1], {
    dayInMonth: 30,
    dayInWeek: DayEnum.Tuesday,
    month: prevMonth,
  })
  assert.equal(calendar[0][2], {
    dayInMonth: 31,
    dayInWeek: DayEnum.Wednesday,
    month: prevMonth,
  })
  assert.equal(calendar[0][3], {
    dayInMonth: 1,
    dayInWeek: DayEnum.Thursday,
    month,
  })
  assert.equal(calendar[2][3], {
    dayInMonth: 15,
    dayInWeek: DayEnum.Thursday,
    month,
  })
  assert.equal(calendar[5][6], {
    dayInMonth: 9,
    dayInWeek: DayEnum.Sunday,
    month: nextMonth,
  })
})

test('calendarMonth has days in right order', () => {
  const calendar = calendarMonth(2017, 6, DayEnum.Monday)
  /* tslint:disable:prefer-for-of */
  for (let i = 0; i < calendar.length; i++) {
    assert.is(calendar[i].length, 7)
    /* tslint:disable:prefer-for-of */
    for (let j = 0; j < calendar[i].length; j++) {
      assert.is(calendar[i][j].dayInWeek, j < 6 ? j + 1 : 0)
      assert.ok(calendar[i][j].dayInMonth >= 1)
      assert.ok(calendar[i][j].dayInMonth <= 31)
    }
  }
})

test('calendarMonth fails fast when called with bad values', () => {
  ;[undefined, null, false, true, '123', 'abc'].forEach((badValue) => {
    assert.throws(() => calendarMonth(badValue, undefined), /Year can be a number between 1900 and 3000/)
    assert.throws(() => calendarMonth(badValue, 1), /Year can be a number between 1900 and 3000/)
    assert.throws(() => calendarMonth(2017, badValue), /Month can be a number from 1 and 12/)
    // because default parameter will kick in
    if (badValue !== undefined) {
      assert.throws(() => calendarMonth(2017, 12, badValue), /Start of the week can be a number from 0 and 6/)
    }
  })

  assert.not.throws(() => calendarMonth(2017, 12))
  assert.not.throws(() => calendarMonth('2017', '12'))
  assert.not.throws(() => calendarMonth(2017, 12, 1))
  assert.not.throws(() => calendarMonth(2017, 12, '1'))
})

test('oct 2017', () => {
  const month: IMonth = { month: 10, year: 2017 }
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month)

  assert.equal(calendar[0][0], {
    dayInMonth: 1,
    dayInWeek: DayEnum.Sunday,
    month,
  })

  assert.equal(calendar[5][6], {
    dayInMonth: 11,
    dayInWeek: DayEnum.Saturday,
    month: nextMonth,
  })
})

test.run()
