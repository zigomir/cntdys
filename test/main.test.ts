import { calendarMonth, getDaysInMonth, getNextDay, getNextMonth, getPreviousDay, getPreviousMonth } from '../src/main'
import { DayEnum, IMonth, MonthEnum } from '../src/types'

test('get days in month', () => {
  expect(getDaysInMonth(2016, 2)).toBe(29)
  expect(getDaysInMonth(2017, 2)).toBe(28)
  expect(getDaysInMonth(2017, 1)).toBe(31)
  expect(getDaysInMonth(2017, 8)).toBe(31)
})

test('getPreviousMonth', () => {
  expect(getPreviousMonth(2016, 1)).toEqual({
    month: 12,
    year: 2015
  })

  expect(getPreviousMonth(2016, 2)).toEqual({
    month: 1,
    year: 2016
  })
})

test('getNextMonth', () => {
  expect(getNextMonth(2016, 12)).toEqual({
    month: MonthEnum.January,
    year: 2017
  })

  expect(getNextMonth(2016, 1)).toEqual({
    month: MonthEnum.February,
    year: 2016
  })
})

test('getPreviousDay', () => {
  expect(getPreviousDay(2016, 1, 1)).toEqual({
    dayInMonth: 31,
    dayInWeek: DayEnum.Thursday,
    month: {
      month: MonthEnum.December,
      year: 2015
    }
  })

  expect(getPreviousDay(2016, 6, 1)).toEqual({
    dayInMonth: 31,
    dayInWeek: DayEnum.Tuesday,
    month: {
      month: MonthEnum.May,
      year: 2016
    }
  })

  expect(getPreviousDay(2016, 1, 2)).toEqual({
    dayInMonth: 1,
    dayInWeek: DayEnum.Friday,
    month: {
      month: MonthEnum.January,
      year: 2016
    }
  })

  expect(getPreviousDay(2016, 12, 31)).toEqual({
    dayInMonth: 30,
    dayInWeek: DayEnum.Friday,
    month: {
      month: MonthEnum.December,
      year: 2016
    }
  })
})

test('getNextDay', () => {
  expect(getNextDay(2016, 2, 29)).toEqual({
    dayInMonth: 1,
    dayInWeek: DayEnum.Tuesday,
    month: {
      month: MonthEnum.March,
      year: 2016
    }
  })

  expect(getNextDay(2016, 6, 1)).toEqual({
    dayInMonth: 2,
    dayInWeek: DayEnum.Thursday,
    month: {
      month: MonthEnum.June,
      year: 2016
    }
  })

  expect(getNextDay(2016, 12, 31)).toEqual({
    dayInMonth: 1,
    dayInWeek: DayEnum.Sunday,
    month: {
      month: MonthEnum.January,
      year: 2017
    }
  })

  expect(getNextDay(2016, 2, 28)).toEqual({
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: {
      month: MonthEnum.February,
      year: 2016
    }
  })

  expect(getNextDay(2017, 2, 28)).toEqual({
    dayInMonth: 1,
    dayInWeek: DayEnum.Wednesday,
    month: {
      month: MonthEnum.March,
      year: 2017
    }
  })
})

test('calendarMonth (march 2016)', () => {
  const month: IMonth = { month: 3, year: 2016 }
  const prevMonth = getPreviousMonth(month.year, month.month)
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month)
  const numberOfWeeks = calendar.length

  expect(numberOfWeeks).toBe(6)
  for (let i = 0; i < numberOfWeeks; i++) {
    expect(calendar[i].length).toBe(7)
  }
  expect(calendar[5][7]).toBe(undefined)
  expect(calendar[0][0]).toEqual({
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: prevMonth
  })
  expect(calendar[0][1]).toEqual({
    dayInMonth: 1,
    dayInWeek: DayEnum.Tuesday,
    month
  })
  expect(calendar[0][2]).toEqual({
    dayInMonth: 2,
    dayInWeek: DayEnum.Wednesday,
    month
  })
  expect(calendar[0][6]).toEqual({
    dayInMonth: 6,
    dayInWeek: DayEnum.Sunday,
    month
  })
  expect(calendar[2][3]).toEqual({
    dayInMonth: 17,
    dayInWeek: DayEnum.Thursday,
    month
  })
  expect(calendar[5][6]).toEqual({
    dayInMonth: 10,
    dayInWeek: DayEnum.Sunday,
    month: nextMonth
  })
})

test('calendarMonth (june 2017)', () => {
  const month: IMonth = { month: 6, year: 2017 }
  const prevMonth = getPreviousMonth(month.year, month.month)
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month)

  expect(calendar[0][0]).toEqual({
    dayInMonth: 29,
    dayInWeek: DayEnum.Monday,
    month: prevMonth
  })
  expect(calendar[0][1]).toEqual({
    dayInMonth: 30,
    dayInWeek: DayEnum.Tuesday,
    month: prevMonth
  })
  expect(calendar[0][2]).toEqual({
    dayInMonth: 31,
    dayInWeek: DayEnum.Wednesday,
    month: prevMonth
  })
  expect(calendar[0][3]).toEqual({
    dayInMonth: 1,
    dayInWeek: DayEnum.Thursday,
    month
  })
  expect(calendar[2][3]).toEqual({
    dayInMonth: 15,
    dayInWeek: DayEnum.Thursday,
    month
  })
  expect(calendar[5][6]).toEqual({
    dayInMonth: 9,
    dayInWeek: DayEnum.Sunday,
    month: nextMonth
  })
})

test('calendarMonth has days in right order', () => {
  const calendar = calendarMonth(2017, 6)
  /* tslint:disable:prefer-for-of */
  for (let i = 0; i < calendar.length; i++) {
    expect(calendar[i].length).toBe(7)
    /* tslint:disable:prefer-for-of */
    for (let j = 0; j < calendar[i].length; j++) {
      expect(calendar[i][j].dayInWeek).toBe(j < 6 ? j + 1 : 0)
      expect(calendar[i][j].dayInMonth >= 1).toBeTruthy()
      expect(calendar[i][j].dayInMonth <= 31).toBeTruthy()
    }
  }
})

test('calendarMonth fails fast when called with bad values', () => {
  [undefined, null, false, true, '123', 'abc'].forEach((badValue) => {
    expect(() => calendarMonth(badValue, undefined)).toThrow('Wrong year. Please use number from 1900 to 2100')
    expect(() => calendarMonth(badValue, 1)).toThrow('Wrong year. Please use number from 1900 to 2100')
    expect(() => calendarMonth(2017, badValue)).toThrow('Wrong month. Please use number from 1 to 12')
  })

  expect(() => calendarMonth(2017, 12)).not.toThrow()
  expect(() => calendarMonth('2017', '12')).not.toThrow()
})
