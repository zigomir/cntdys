import { Year, Day, Month, MonthNumber, DayEnum } from './types'

export function getDaysInMonth(year: Year, month: MonthNumber): number {
  const daysInMonth = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // naive leap year implementation
  if (month === 2) {
    return year % 4 === 0 ? 29 : 28
  }

  return daysInMonth[month - 1]
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

export function getNextDay(year: Year, month: MonthNumber, day: number): Day {
  const isLastDayInMonth = (year: Year, month: MonthNumber, day: number) => getDaysInMonth(year, month) === day
  if (isLastDayInMonth(year, month, day)) {
    const nextMonth = getNextMonth(year, month)
    const nextDay = new Date(Date.UTC(nextMonth.year, nextMonth.month - 1, 1))

    return {
      dayInMonth: nextDay.getUTCDate(),
      dayInWeek: nextDay.getUTCDay(),
      month: nextMonth
    }
  }

  const nextDay = new Date(Date.UTC(year, month - 1, day + 1))

  return {
    dayInMonth: nextDay.getUTCDate(),
    dayInWeek: nextDay.getUTCDay(),
    month: {
      year: year,
      month: month
    }
  }
}

export function calendarMonth(year: number, month: MonthNumber): Day[][] {
  let days: Day[] = []

  const firstDayInMonth = new Date(Date.UTC(year, month - 1, 1))
  let startingDay: Day = {
    dayInMonth: firstDayInMonth.getUTCDate(),
    dayInWeek: firstDayInMonth.getUTCDay(),
    month: { month, year }
  }

  // go back to first monday
  if (startingDay.dayInWeek !== DayEnum.Monday) {
    let previousDay = getPreviousDay(year, month, firstDayInMonth.getUTCDate())

    while (previousDay.dayInWeek !== DayEnum.Monday) {
      previousDay = getPreviousDay(year, month, firstDayInMonth.getUTCDate())
    }

    startingDay = previousDay
  }

  let currentDay = Object.assign({}, startingDay)
  // then go next day up until all 42 (6 weeks) are filled
  const MONTH_CALENDAR_DAYS_NUMBER = 42
  while (days.length < MONTH_CALENDAR_DAYS_NUMBER) {
    days.push(currentDay)
    currentDay = getNextDay(currentDay.month.year, currentDay.month.month, currentDay.dayInMonth)
  }

  return [
    days.slice(0, 7),
    days.slice(7, 14),
    days.slice(14, 21),
    days.slice(21, 28),
    days.slice(28, 35),
    days.slice(35, MONTH_CALENDAR_DAYS_NUMBER)
  ]
}
