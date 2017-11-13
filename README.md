# count'em days

> 654 B calendar (no UI)

## goals

- separate calendar logic from ui
- minimal size
- modern – use ES modules for delivery

## usage

```html
<script type="module">
  // for minified build use https://unpkg.com/cntdys@latest/dist/main.min.js
  import { calendarMonth } from 'https://unpkg.com/cntdys'
  console.log('calendarMonth', calendarMonth(2017, 9))
  // or with different start of the week
  console.log('calendarMonth', calendarMonth(2017, 9, 1)) // start week on Monday (0 = Sunday)
</script>
```

or with `npm install cntdys`.

## what about ui?

[nanocal](https://github.com/zigomir/nanocal)
