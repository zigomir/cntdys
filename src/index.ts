interface Month {
  name: MonthName
  number: MonthNumber
  year: number
  days: 28 | 29 | 30 | 31
}

interface MonthCalendar {
  month: Month
}

interface YearCalendar {
  year: Year
}

type DayName = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type MonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

type Year = [Month, Month, Month, Month, Month, Month, Month, Month, Month, Month, Month, Month]

export function getDaysInMonth(year: number, month: MonthNumber) {
  const daysInMonth = [
    31, // jan
    [28, 29], // feb
    31, // mar
    30, // apr
    31, // may
    30, // jun
    31, // jul
    31, // aug
    30, // sep
    31, // oct
    30, // nov
    31 // dec
  ]

  // naive leap year implementation
  if (month === 2) {
    return year % 4 === 0 ? 29 : 28
  }

  return daysInMonth[month - 1]
}

export function listDays(year: number, month: MonthNumber) {
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