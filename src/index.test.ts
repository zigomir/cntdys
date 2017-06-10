import { Day, getDaysInMonth, listDays, calendarMonth } from './index'

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

test('print out calendar month by days', () => {
  expect(calendarMonth(2016, 3).length).toBe(6) // calendar month can be stretched over 6 weeks
  expect(calendarMonth(2016, 3)[0][0]).toEqual({
    name: 'Monday',
    dayInWeek: 0,
    dayInMonth: 29,
    year: 2016,
    month: 2
  } as Day)
  expect(calendarMonth(2016, 3)[0][1]).toEqual({
    name: 'Tuesday',
    dayInWeek: 1,
    dayInMonth: 1,
    year: 2016,
    month: 3
  } as Day)
})
