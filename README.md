![](https://badgen.net/bundlephobia/minzip/cntdys)

# count'em days

> half KB JS calendar

## goals

- separate calendar logic from ui
- minimal size
- modern – use ES modules for delivery

## usage

```html
<script type="module">
  import { calendarMonth } from 'https://unpkg.com/cntdys@latest/dist/main.min.js'
  console.log('calendarMonth', calendarMonth(2017, 9))
  // or with different start of the week
  console.log('calendarMonth', calendarMonth(2017, 9, 1)) // start week on Monday (0 = Sunday)
</script>
```

or with `npm install cntdys`.

## what about ui?

[caly](https://github.com/zigomir/caly)
