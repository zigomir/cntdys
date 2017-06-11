import { Year, Day, Month, MonthNumber } from './types'

export function getDaysInMonth(year: Year, month: MonthNumber): number {
  const daysInMonth = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

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

export function getPreviousDay(year: Year, month: MonthNumber, day: number): Day {
  if (day === 1) {
    const prevMonth = getPreviousMonth(year, month)
    const lastDayInPrevMonth = getDaysInMonth(prevMonth.year, prevMonth.month)
    const previousDay = new Date(Date.UTC(prevMonth.year, prevMonth.month - 1, lastDayInPrevMonth))

    return {
      dayInMonth: previousDay.getUTCDate(),
      dayInWeek: previousDay.getUTCDay(),
      month: prevMonth
    }
  }

  const previousDay = new Date(Date.UTC(year, month - 1, day - 1))

  return {
    dayInMonth: previousDay.getUTCDate(),
    dayInWeek: previousDay.getUTCDay(),
    month: {
      year: year,
      month: month
    }
  }
}

// TODO: calendar with days - go with columns instead - nah…
// we always have 6 (at most) weeks (see October 2016)
// so this means we need to list 6 mondays, 6 tuesdays, 6 wednesdays etc...
export function calendarMonth(year: number, month: MonthNumber): Day[][] {
  // const a = new Date('3/1/2016')
  // const firstDayInMonth = new Date(`${month}/1/${year}`)
  const firstDayInMonth = new Date(Date.UTC(year, month - 1))
  const firstDayInMonthDayInWeek = firstDayInMonth.getUTCDay()
  // const firstDayInMonthDayInMonth = firstDayInMonth.getDate() // always 1
  // var c = a.getDay() // tuesday
  // console.log(firstDayInMonthDayInWeek, firstDayInMonthDayInMonth)
  // if (firstDayInMonthDayInWeek > 1) {
  //   console.log('go back')
  // }
  // TODO: go day by day back until you hit monday or start of the week
  // go day by day forward until you hit sunday or end of the week

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
