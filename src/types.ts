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
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

export interface Day {
  dayInWeek: DayEnum
  dayInMonth: number
  month: Month
}
