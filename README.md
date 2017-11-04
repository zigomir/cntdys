# count'em days

> 654 B calendar (no UI)

## why

do not be satisfied with `moment.js` + `jquery` combo to have a simple date picker

## goals

- separate calendar logic from ui
- minimal size
- modern – use ES modules for delivery
- simple to use

## usage

See test/index.html file

```html
<script type="module">
  import { calendarMonth } from 'https://unpkg.com/cntdys@latest/dist/main.min.js' // minified or https://unpkg.com/cntdys for non-minified build
  console.log('calendarMonth', calendarMonth(2017, 9))

  // or with different start of the week
  console.log('calendarMonth', calendarMonth(2017, 9, 1)) // start week on Monday (0 = Sunday)
</script>
```

or with `npm install cntdys`.

## where is UI?

WIP -> soon
