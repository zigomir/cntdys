# count'em days

> half KB JS calendar

## goals

- separate calendar logic from ui
- minimal size
- modern – use ES modules for delivery

## development

- developed with Deno v2

## usage

```html
<script type="module">
  import { calendarMonth } from 'https://esm.sh/jsr/@ziga/cntdys@0.7.0'
  console.log('calendarMonth', calendarMonth(2017, 9))
  // or with different start of the week
  console.log('calendarMonth', calendarMonth(2017, 9, 1)) // start week on Monday (0 = Sunday)
</script>
```

or with `npm install cntdys`.

## what about ui?

[caly](https://github.com/zigomir/caly)
