import { DayEnum, IDay, IMonth, MonthEnum, MonthNumber, Year } from './types'
export { DayEnum, IDay, IMonth, MonthEnum, MonthNumber, Year }

const isLeap = (year: Year) => year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)

export const getDaysInMonth = (year: Year, month: MonthNumber): number => {
  const daysInMonth = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (month === MonthEnum.February) {
    return isLeap(year) ? 29 : 28
  }

  return daysInMonth[month - 1]
}

export const getPreviousMonth = (year: Year, month: MonthNumber): IMonth => {
  if (month === MonthEnum.January) {
    return {
      month: MonthEnum.December,
      year: year - 1
    }
  }

  return {
    month: month - 1,
    year
  }
}

export const getNextMonth = (year: Year, month: MonthNumber): IMonth => {
  if (month === MonthEnum.December) {
    return {
      month: 1,
      year: year + 1
    }
  }

  return {
    month: month + 1,
    year
  }
}

export const getPreviousDay = (year: Year, month: MonthNumber, day: number): IDay => {
  if (day === 1) {
    const prevMonth = getPreviousMonth(year, month)
    const lastDayInPrevMonth = getDaysInMonth(prevMonth.year, prevMonth.month)
    const previousDayFromPreviousMonth = new Date(Date.UTC(prevMonth.year, prevMonth.month - 1, lastDayInPrevMonth))

    return {
      dayInMonth: previousDayFromPreviousMonth.getUTCDate(),
      dayInWeek: previousDayFromPreviousMonth.getUTCDay(),
      month: prevMonth
    }
  }

  const previousDay = new Date(Date.UTC(year, month - 1, day - 1))

  return {
    dayInMonth: previousDay.getUTCDate(),
    dayInWeek: previousDay.getUTCDay(),
    month: { month, year }
  }
}

export const getNextDay = (year: Year, month: MonthNumber, day: number): IDay => {
  const isLastDayInMonth = (y: Year, m: MonthNumber, d: number) => getDaysInMonth(y, m) === d
  if (isLastDayInMonth(year, month, day)) {
    const nextMonth = getNextMonth(year, month)
    const nextDayOfNextMonth = new Date(Date.UTC(nextMonth.year, nextMonth.month - 1, 1))

    return {
      dayInMonth: nextDayOfNextMonth.getUTCDate(),
      dayInWeek: nextDayOfNextMonth.getUTCDay(),
      month: nextMonth
    }
  }

  const nextDay = new Date(Date.UTC(year, month - 1, day + 1))

  return {
    dayInMonth: nextDay.getUTCDate(),
    dayInWeek: nextDay.getUTCDay(),
    month: { month, year }
  }
}

/**
 * Get calendar for given month.
 *
 * @param {number} year - year [1900 – 2100]
 * @param {number} month - Month [1  - 12]
 * @param {number} [startOfTheWeek=0] - Start of the week [0 – 6] where 0 is Sunday, and 6 is Saturday
 *
 * @returns {Object[][]}
 */
export function calendarMonth (year: any, month: any, startOfTheWeek: any = DayEnum.Sunday): IDay[][] {
  year = parseInt(year, 10)
  month = parseInt(month, 10)
  startOfTheWeek = parseInt(startOfTheWeek, 10)

  if (!year || isNaN(year) || year < 1900 || year > 2100) {
    throw Error('Year can be a number between 1900 and 3000')
  }
  if (!month || isNaN(month) || month < 1 || month > 12) {
    throw Error('Month can be a number from 1 and 12')
  }
  if ((!startOfTheWeek && startOfTheWeek !== 0) || isNaN(startOfTheWeek) || startOfTheWeek < 0 || startOfTheWeek > 6) {
    throw Error('Start of the week can be a number from 0 and 6')
  }

  const firstDayInMonth = new Date(Date.UTC(year, month - 1, 1))
  let startingDay: IDay = {
    dayInMonth: firstDayInMonth.getUTCDate(),
    dayInWeek: firstDayInMonth.getUTCDay(),
    month: { month, year }
  }

  // go back to first start of the week (Monday or Sunday, or any other really)
  if (startingDay.dayInWeek !== startOfTheWeek) {
    let previousDay = getPreviousDay(startingDay.month.year, startingDay.month.month, startingDay.dayInMonth)

    while (previousDay.dayInWeek !== startOfTheWeek) {
      previousDay = getPreviousDay(previousDay.month.year, previousDay.month.month, previousDay.dayInMonth)
    }

    startingDay = previousDay
  }

  const DAYS_IN_WEEK = 7
  const WEEKS_IN_CALENDAR = 6
  const MONTH_CALENDAR_DAYS_NUMBER = DAYS_IN_WEEK * WEEKS_IN_CALENDAR

  const days: IDay[] = []
  let currentDay = startingDay
  // then go next day up until all 42 (6 weeks) are filled
  while (days.length < MONTH_CALENDAR_DAYS_NUMBER) {
    days.push(currentDay)
    currentDay = getNextDay(currentDay.month.year, currentDay.month.month, currentDay.dayInMonth)
  }

  return [
    days.slice(DAYS_IN_WEEK * 0, DAYS_IN_WEEK * 1),
    days.slice(DAYS_IN_WEEK * 1, DAYS_IN_WEEK * 2),
    days.slice(DAYS_IN_WEEK * 2, DAYS_IN_WEEK * 3),
    days.slice(DAYS_IN_WEEK * 3, DAYS_IN_WEEK * 4),
    days.slice(DAYS_IN_WEEK * 4, DAYS_IN_WEEK * 5),
    days.slice(DAYS_IN_WEEK * 5, DAYS_IN_WEEK * 6)
  ]
}
