export { calendarMonth, getDaysInMonth, getNextDay, getPreviousDay, getNextMonth, getPreviousMonth } from './main'
export type Year = number
export type MonthNumber = MonthEnum

export interface IDay {
  dayInWeek: DayEnum
  dayInMonth: number
  month: IMonth
}

export interface IMonth {
  year: Year
  month: MonthEnum
}

export const enum MonthEnum {
  January = 1, // it is 0 in JS Date, but starting with 1 is better as human readable API
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

export const enum DayEnum {
  Sunday, // sunday = 0 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}
