import { getDaysInMonth, calendarMonth, getPreviousMonth, getNextMonth, getPreviousDay, getNextDay } from '../src/main'
import { Day, Month, MonthEnum, DayEnum } from '../src/types'

test('get days in month', () => {
  expect(getDaysInMonth(2016, 2)).toBe(29)
  expect(getDaysInMonth(2017, 2)).toBe(28)
  expect(getDaysInMonth(2017, 1)).toBe(31)
  expect(getDaysInMonth(2017, 8)).toBe(31)
})

test('getPreviousMonth', () => {
  expect(getPreviousMonth(2016, 1)).toEqual(
    {
      year: 2015,
      month: 12
    } as Month
  )

  expect(getPreviousMonth(2016, 2)).toEqual(
    {
      year: 2016,
      month: 1
    } as Month
  )
})

test('getNextMonth', () => {
  expect(getNextMonth(2016, 12)).toEqual(
    {
      year: 2017,
      month: MonthEnum.January
    } as Month
  )

  expect(getNextMonth(2016, 1)).toEqual(
    {
      year: 2016,
      month: MonthEnum.February
    } as Month
  )
})

test('getPreviousDay', () => {
  expect(getPreviousDay(2016, 1, 1)).toEqual(
    {
      dayInMonth: 31,
      dayInWeek: DayEnum.Thursday,
      month: {
        year: 2015,
        month: MonthEnum.December
      }
    } as Day
  )

  expect(getPreviousDay(2016, 6, 1)).toEqual(
    {
      dayInMonth: 31,
      dayInWeek: DayEnum.Tuesday,
      month: {
        year: 2016,
        month: MonthEnum.May
      }
    } as Day
  )

  expect(getPreviousDay(2016, 1, 2)).toEqual(
    {
      dayInMonth: 1,
      dayInWeek: DayEnum.Friday,
      month: {
        year: 2016,
        month: MonthEnum.January
      }
    } as Day
  )

  expect(getPreviousDay(2016, 12, 31)).toEqual(
    {
      dayInMonth: 30,
      dayInWeek: DayEnum.Friday,
      month: {
        year: 2016,
        month: MonthEnum.December
      }
    } as Day
  )
})

test('getNextDay', () => {
  expect(getNextDay(2016, 2, 29)).toEqual(
    {
      dayInMonth: 1,
      dayInWeek: DayEnum.Tuesday,
      month: {
        year: 2016,
        month: MonthEnum.March
      }
    } as Day
  )

  expect(getNextDay(2016, 6, 1)).toEqual(
    {
      dayInMonth: 2,
      dayInWeek: DayEnum.Thursday,
      month: {
        year: 2016,
        month: MonthEnum.June
      }
    } as Day
  )

  expect(getNextDay(2016, 12, 31)).toEqual(
    {
      dayInMonth: 1,
      dayInWeek: DayEnum.Sunday,
      month: {
        year: 2017,
        month: MonthEnum.January
      }
    } as Day
  )

  expect(getNextDay(2016, 2, 28)).toEqual(
    {
      dayInMonth: 29,
      dayInWeek: DayEnum.Monday,
      month: {
        year: 2016,
        month: MonthEnum.February
      }
    } as Day
  )

  expect(getNextDay(2017, 2, 28)).toEqual(
    {
      dayInMonth: 1,
      dayInWeek: DayEnum.Wednesday,
      month: {
        year: 2017,
        month: MonthEnum.March
      }
    } as Day
  )
})

test('calendarMonth (march 2016)', () => {
  const month: Month = { month: 3, year: 2016 }
  const prevMonth = getPreviousMonth(month.year, month.month)
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month)
  const numberOfWeeks = calendar.length

  expect(numberOfWeeks).toBe(6)
  for (let i = 0; i < numberOfWeeks; i++) {
    expect(calendar[i].length).toBe(7)
  }
  expect(calendar[5][7]).toBe(undefined)
  expect(calendar[0][0]).toEqual(
    {
      dayInWeek: DayEnum.Monday,
      dayInMonth: 29,
      month: prevMonth
    } as Day
  )
  expect(calendar[0][1]).toEqual(
    {
      dayInWeek: DayEnum.Tuesday,
      dayInMonth: 1,
      month
    } as Day
  )
  expect(calendar[0][2]).toEqual(
    {
      dayInWeek: DayEnum.Wednesday,
      dayInMonth: 2,
      month
    } as Day
  )
  expect(calendar[0][6]).toEqual(
    {
      dayInWeek: DayEnum.Sunday,
      dayInMonth: 6,
      month
    } as Day
  )
  expect(calendar[2][3]).toEqual(
    {
      dayInWeek: DayEnum.Thursday,
      dayInMonth: 17,
      month
    } as Day
  )
  expect(calendar[5][6]).toEqual(
    {
      dayInWeek: DayEnum.Sunday,
      dayInMonth: 10,
      month: nextMonth
    } as Day
  )
})

test('calendarMonth (june 2017)', () => {
  const month: Month = { month: 6, year: 2017 }
  const prevMonth = getPreviousMonth(month.year, month.month)
  const nextMonth = getNextMonth(month.year, month.month)
  const calendar = calendarMonth(month.year, month.month)

  expect(calendar[0][0]).toEqual(
    {
      dayInWeek: DayEnum.Monday,
      dayInMonth: 29,
      month: prevMonth
    } as Day
  )
  expect(calendar[0][1]).toEqual(
    {
      dayInWeek: DayEnum.Tuesday,
      dayInMonth: 30,
      month: prevMonth
    } as Day
  )
  expect(calendar[0][2]).toEqual(
    {
      dayInWeek: DayEnum.Wednesday,
      dayInMonth: 31,
      month: prevMonth
    } as Day
  )
  expect(calendar[0][3]).toEqual(
    {
      dayInWeek: DayEnum.Thursday,
      dayInMonth: 1,
      month
    } as Day
  )
  expect(calendar[2][3]).toEqual(
    {
      dayInWeek: DayEnum.Thursday,
      dayInMonth: 15,
      month
    } as Day
  )
  expect(calendar[5][6]).toEqual(
    {
      dayInWeek: DayEnum.Sunday,
      dayInMonth: 9,
      month: nextMonth
    } as Day
  )
})

test('calendarMonth has days in right order', () => {
  const calendar = calendarMonth(2017, 6)
  for (let i = 0; i < calendar.length; i++) {
    expect(calendar[i].length).toBe(7)
    for (let j = 0; j < calendar[i].length; j++) {
      expect(calendar[i][j].dayInWeek).toBe(j < 6 ? j + 1 : 0)
      expect(calendar[i][j].dayInMonth >= 1).toBeTruthy()
      expect(calendar[i][j].dayInMonth <= 31).toBeTruthy()
    }
  }
})
