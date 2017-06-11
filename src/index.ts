import { Year, Day, Month, MonthNumber } from './types'

export function getDaysInMonth(year: Year, month: MonthNumber) {
  const daysInMonth = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // naive leap year implementation
  if (month === 2) {
    return year % 4 === 0 ? 29 : 28
  }

  return daysInMonth[month - 1]
}

export function listDays(year: Year, month: MonthNumber) {
  const daysInMonth = getDaysInMonth(year, month)
  const allDays = [...Array(daysInMonth).keys()].map(d => d + 1)

  const weeks = [
    allDays.slice(0, 7),
    allDays.slice(7, 14),
    allDays.slice(14, 21),
    allDays.slice(21, 28),
    allDays.slice(28, 31)
  ]

  return weeks
}

export function getPreviousMonth(year: Year, month: MonthNumber): Month {
  if (month === 1) {
    return {
      year: year - 1,
      month: 12
    }
  }

  return {
    year: year,
    month: month - 1
  }
}

export function getNextMonth(year: Year, month: MonthNumber): Month {
  if (month === 12) {
    return {
      year: year + 1,
      month: 1
    }
  }

  return {
    year: year,
    month: month + 1
  }
}

// TODO: calendar with days - go with columns instead
// we always have 6 (at most) weeks (see October 2016)
// so this means we need to list 6 mondays, 6 tuesdays, 6 wednesdays etc...
export function calendarMonth(year: number, month: MonthNumber): Day[][] {
  // const a = new Date('3/1/2016')
  // const firstDayInMonth = new Date(`${month}/1/${year}`)
  const firstDayInMonth = new Date(year, month - 1)
  const firstDayInMonthDayInWeek = firstDayInMonth.getDay()
  // var c = a.getDay() // tuesday
  console.log(firstDayInMonthDayInWeek)

  return [
    [
      {
        dayInWeek: 0,
        dayInMonth: 29, // taken from previous month
        month: {
          year: 2016,
          month: 1
        }
      },
      {
        dayInWeek: 1,
        dayInMonth: 1,
        month: {
          year: 2016,
          month: 3
        }
      }
    ],
    [],
    [],
    [],
    [],
    []
  ]
}
