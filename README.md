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

Find a system:

-  Add this to last week of month if week ago is a day of current month

```css
.last-week-of-month {
  margin-top: 0px;
  border-bottom: 1px solid white;
  margin-bottom: -1px;
}
```

```css
.last-day-of-month {
  margin-left: 0;
  margin-top: 0;
  height: 37px;
  border-bottom: 0;
  border-right: 0;
  border-left: 0.5px solid var(--main-color);
  border-top: 0.5px solid var(--main-color);
}
```

```css

  margin-top: 0;
  height: 37px;
  width: 37.5px;
  border-bottom: 0;
  border-right: 0;
  border-top: 0.5px solid var(--main-color);
  border-right: 1px solid white;
  margin-right: -1px;
}
```


- start week with: https://www.reddit.com/r/MapPorn/comments/35hb3a/first_day_of_the_week_in_different_countries/
- export as es module?
- optimize: don't throw everything and re-create all
- prepare demo using in vue and preact

