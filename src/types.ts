export enum MonthEnum {
  January = 1,
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

export type Year = number
export type MonthNumber = MonthEnum

export interface Month {
  year: Year
  month: MonthEnum
}

// type Year = [Month, Month, Month, Month, Month, Month, Month, Month, Month, Month, Month, Month]

export enum DayEnum {
  Sunday, // sunday = 0 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export interface Day {
  dayInWeek: DayEnum
  dayInMonth: number
  month: Month
}
