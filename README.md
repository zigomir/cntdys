# count them days

> 2kb calendar

## why

i am not satisfied with moment.js + jquery combo to have a simple date picker

## goal(s)

- separate calendar logic from ui
- separate logic from data
- render with:
  - svelte (no runtime)
  - custom elements

## inspiration(s)

- macOS calendar
- AirBnb DateRangePicker

## todos

## Double borders

- current month
  - first day in week or in month: border-left = 1px -> no, this is not ok, last other month day should have border right
  - last day in week or in month: border-right = 1px

- pass `IDay` around instead of multiple params
- start week with: https://www.reddit.com/r/MapPorn/comments/35hb3a/first_day_of_the_week_in_different_countries/
- export as es module?
- optimize: don't throw everything and re-create all
- prepare demo using in vue and preact

