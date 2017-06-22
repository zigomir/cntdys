import { IDay } from './types'
import { calendarMonth } from './main'

export class CalendarElement extends HTMLElement {
  year: number
  month: number
  day: number

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'})
    this.render = this.render.bind(this)
    this.render()
  }

  render() {
    this.year = Number(this.getAttribute('year'))
    this.month = Number(this.getAttribute('month'))
    this.day = Number(this.getAttribute('day'))

    const isCurrentMonth = (day: IDay, month: number) => day.month.month === month
    const isWeekend = (day: IDay) => day.dayInWeek === 6 || day.dayInWeek === 0

    const calendarDays = calendarMonth(this.year, this.month)
    const weekendClass = (day: IDay) => isWeekend(day) ? 'weekend' : ''
    const currentMonthClass = (day: IDay) => isCurrentMonth(day, this.month) ? ' current-month' : ' other-month'
    const isSelectedClass = (day: IDay) => this.day === day.dayInMonth && this.month === day.month.month && this.year === day.month.year ? 'selected' : ''

    const days = `<div data-action="selectDay" class="weeks">
      ${calendarDays
        .map(week => `
          <div class="week">${week.map(day =>
            `<span data-day-in-month="${day.dayInMonth}" class="day ${isSelectedClass(day)} ${weekendClass(day)} ${currentMonthClass(day)}">${day.dayInMonth}</span>`)
            .join('')}
          </div>`
        )
        .join('')}
    </div>`

    const header = `<div class="header">
      <span>${this.year} - ${this.month}</span>
      <div class="week">
        <span class="day day-name">Mo</span>
        <span class="day day-name">Tu</span>
        <span class="day day-name">We</span>
        <span class="day day-name">Th</span>
        <span class="day day-name">Fr</span>
        <span class="day day-name">Sa</span>
        <span class="day day-name">Su</span>
      </div>
    </div>`

    // TODO: find out how can others style this through JS - CSS variables should enable it, but not sure when in Shadow DOM.
    const style = `<style>
      :host {
        --main-color: #e4e7e7;
        --selected-color: #00a699;
        --other-day-color: #cacccd;
        --cell-size: 37px;
        display: inline-block;
      }
      .weeks {
        border-left: 1px solid var(--main-color);
        border-right: 1px solid var(--main-color);
      }
      .week {
        display: flex;
        border-bottom: 1px solid var(--main-color);
      }
      .day {
        width: var(--cell-size);
        height: var(--cell-size);
        text-align: center;
        border-right: 1px solid var(--main-color);
        display: flex;
        align-self: center;
        justify-content: center;
        flex-direction: column;
        user-select: none;
      }
      .day.day-name {
        border-right: 1px solid transparent;
      }
      .day:last-child {
        border-right: 1px solid transparent;
      }
      .day:hover {
        cursor: default;
      }
      .day.current-month:hover {
        cursor: pointer;
        background-color: var(--main-color);
      }
      .day.current-month.selected {
        background-color: var(--selected-color);
        color: white;
      }
      .day.other-month {
        color: var(--other-day-color);
        pointer-events: none;
      }
    </style>`

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = style + header + days
      const element = this.shadowRoot.querySelector('[data-action=selectDay]')
      if (element) {
        element.addEventListener('click', this.onClick.bind(this))
      }
    }
  }

  onClick(e: Event) {
    if ((<HTMLElement>e.target).classList.contains('day')) {
      const newDay = (<HTMLElement>e.target).dataset.dayInMonth
      this.setAttribute('day', newDay || '')
      this.render()

      this.dispatchEvent(new CustomEvent('date-selected', {
        detail: {
          year: this.year,
          month: this.month,
          day: Number(newDay)
        },
        bubbles: false
      }))
    }
  }

  disconnectedCallback() {
    if (this.shadowRoot) {
      const element = this.shadowRoot.querySelector('[data-action=selectDay]')
      if (element) {
        element.removeEventListener('click')
      }
    }
  }
}
