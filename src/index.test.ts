import { getDaysInMonth, listDays } from './index'

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
})
