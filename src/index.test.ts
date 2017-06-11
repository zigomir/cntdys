import { getDaysInMonth, listDays, calendarMonth, getPreviousMonth, getNextMonth, getPreviousDay } from './index'
import { Day, Month, MonthEnum, DayEnum } from './types'

test('get days in month', () => {
  expect(getDaysInMonth(2016, 2)).toBe(29)
  expect(getDaysInMonth(2017, 2)).toBe(28)
  expect(getDaysInMonth(2017, 1)).toBe(31)
  expect(getDaysInMonth(2017, 8)).toBe(31)
})

test('prints out whole month', () => {
  expect(listDays(2016, 2)).toEqual([
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29]
  ])

  expect(listDays(2016, 3)).toEqual([
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31]
  ])
})

test('getPreviousMonth', () => {
  expect(getPreviousMonth(2016, 1)).toEqual({
    year: 2015,
    month: 12
  } as Month)

  expect(getPreviousMonth(2016, 2)).toEqual({
    year: 2016,
    month: 1
  } as Month)
})

test('getNextMonth', () => {
  expect(getNextMonth(2016, 12)).toEqual({
    year: 2017,
    month: MonthEnum.January
  } as Month)

  expect(getNextMonth(2016, 1)).toEqual({
    year: 2016,
    month: MonthEnum.February
  } as Month)
})

test('getPreviousDay', () => {
  expect(getPreviousDay(2016, 1, 1)).toEqual({
    dayInMonth: 31,
    dayInWeek: DayEnum.Thursday,
    month: {
      year: 2015,
      month: MonthEnum.December
    }
  } as Day)

  expect(getPreviousDay(2016, 6, 1)).toEqual({
    dayInMonth: 31,
    dayInWeek: DayEnum.Tuesday,
    month: {
      year: 2016,
      month: MonthEnum.May
    }
  } as Day)

  expect(getPreviousDay(2016, 1, 2)).toEqual({
    dayInMonth: 1,
    dayInWeek: DayEnum.Friday,
    month: {
      year: 2016,
      month: MonthEnum.January
    }
  } as Day)

  expect(getPreviousDay(2016, 12, 31)).toEqual({
    dayInMonth: 30,
    dayInWeek: DayEnum.Friday,
    month: {
      year: 2016,
      month: MonthEnum.December
    }
  } as Day)
})

// test('print out calendar month by days', () => {
//   expect(calendarMonth(2016, 3).length).toBe(6) // calendar month can be stretched over 6 weeks
//   expect(calendarMonth(2016, 3)[0][0]).toEqual(
//     {
//       dayInWeek: DayEnum.Monday,
//       dayInMonth: 29,
//       month: {
//         year: 2016,
//         month: 1
//       }
//     } as Day
//   )
//   expect(calendarMonth(2016, 3)[0][1]).toEqual(
//     {
//       dayInWeek: DayEnum.Tuesday,
//       dayInMonth: 1,
//       month: {
//         year: 2016,
//         month: 3
//       }
//     } as Day
//   )
// })
