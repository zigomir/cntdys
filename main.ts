import { DayEnum, IDay, IMonth, MonthEnum, MonthNumber } from "./types.ts";

const isLeap = (year: number) => new Date(year, 1, 29).getDate() === 29;

export const getDaysInMonth = (year: number, month: MonthNumber): number => {
  const daysInMonth = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === MonthEnum.February) {
    return isLeap(year) ? 29 : 28;
  }

  return daysInMonth[month - 1];
};

export const getPreviousMonth = (year: number, month: MonthNumber): IMonth => {
  if (month === MonthEnum.January) {
    return {
      month: MonthEnum.December,
      year: year - 1,
    };
  }

  return {
    month: month - 1,
    year,
  };
};

export const getNextMonth = (year: number, month: MonthNumber): IMonth => {
  if (month === MonthEnum.December) {
    return {
      month: 1,
      year: year + 1,
    };
  }

  return {
    month: month + 1,
    year,
  };
};

export const getPreviousDay = (
  year: number,
  month: MonthNumber,
  day: number,
): IDay => {
  if (day === 1) {
    const prevMonth = getPreviousMonth(year, month);
    const lastDayInPrevMonth = getDaysInMonth(prevMonth.year, prevMonth.month);
    const previousDayFromPreviousMonth = new Date(
      Date.UTC(prevMonth.year, prevMonth.month - 1, lastDayInPrevMonth),
    );

    return {
      dayInMonth: previousDayFromPreviousMonth.getUTCDate(),
      dayInWeek: previousDayFromPreviousMonth.getUTCDay(),
      month: prevMonth,
    };
  }

  const previousDay = new Date(Date.UTC(year, month - 1, day - 1));

  return {
    dayInMonth: previousDay.getUTCDate(),
    dayInWeek: previousDay.getUTCDay(),
    month: { month, year },
  };
};

export const getNextDay = (
  year: number,
  month: MonthNumber,
  day: number,
): IDay => {
  const isLastDayInMonth = (y: number, m: MonthNumber, d: number) =>
    getDaysInMonth(y, m) === d;
  if (isLastDayInMonth(year, month, day)) {
    const nextMonth = getNextMonth(year, month);
    const nextDayOfNextMonth = new Date(
      Date.UTC(nextMonth.year, nextMonth.month - 1, 1),
    );

    return {
      dayInMonth: nextDayOfNextMonth.getUTCDate(),
      dayInWeek: nextDayOfNextMonth.getUTCDay(),
      month: nextMonth,
    };
  }

  const nextDay = new Date(Date.UTC(year, month - 1, day + 1));

  return {
    dayInMonth: nextDay.getUTCDate(),
    dayInWeek: nextDay.getUTCDay(),
    month: { month, year },
  };
};

/**
 * Get calendar for given month.
 *
 * @param {number} year - year [1900 – 2100]
 * @param {number} month - Month [1  - 12]
 * @param {number} [startOfTheWeek=0] - Start of the week [0 – 6] where 0 is Sunday, and 6 is Saturday
 *
 * @returns {Object[][]}
 */
export function calendarMonth(
  year: number,
  month: number,
  startOfTheWeek: number = DayEnum.Sunday,
): IDay[][] {
  const firstDayInMonth = new Date(Date.UTC(year, month - 1, 1));
  let startingDay: IDay = {
    dayInMonth: firstDayInMonth.getUTCDate(),
    dayInWeek: firstDayInMonth.getUTCDay(),
    month: { month, year },
  };

  // go back to first start of the week (Monday or Sunday, or any other really)
  if (startingDay.dayInWeek !== startOfTheWeek) {
    let previousDay = getPreviousDay(
      startingDay.month.year,
      startingDay.month.month,
      startingDay.dayInMonth,
    );

    while (previousDay.dayInWeek !== startOfTheWeek) {
      previousDay = getPreviousDay(
        previousDay.month.year,
        previousDay.month.month,
        previousDay.dayInMonth,
      );
    }

    startingDay = previousDay;
  }

  const daysInWeek = 7;
  const weeksInCalendarMonth = 6;
  const calendarMonthDays = daysInWeek * weeksInCalendarMonth;

  const days: IDay[] = [];
  let currentDay = startingDay;
  // then go next day up until all 42 (6 weeks) are filled
  while (days.length < calendarMonthDays) {
    days.push(currentDay);
    currentDay = getNextDay(
      currentDay.month.year,
      currentDay.month.month,
      currentDay.dayInMonth,
    );
  }

  return [
    days.slice(daysInWeek * 0, daysInWeek * 1),
    days.slice(daysInWeek * 1, daysInWeek * 2),
    days.slice(daysInWeek * 2, daysInWeek * 3),
    days.slice(daysInWeek * 3, daysInWeek * 4),
    days.slice(daysInWeek * 4, daysInWeek * 5),
    days.slice(daysInWeek * 5, daysInWeek * 6),
  ];
}
