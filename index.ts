interface Month {
  name: MonthName
  year: number
  days: 28|29|30|31
}

interface MonthCalendar {
  month: Month

}

type DayName = 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

type MonthName = 'January'
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

type year = [
  Month,
  Month,
  Month,
  Month,
  Month,
  Month,
  Month,
  Month,
  Month,
  Month,
  Month,
  Month
]


// const tinydate = require('tinydate')

// const fooDate = new Date('02/28/2017') // if month in here and result doesn't match it means we went over
// const stamp = tinydate('{DD} {MM}')

// const x = stamp(fooDate)
// x

// const a = stamp() // now
// a

console.log(2016 % 4)
// console.log('d'.repeat(4))

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
  31  // dec
]

// Let's rebuild AirBnb's date range selector
// 1) for given month(s) list all the days in it
// use getDay to know where in 2d table to put it
