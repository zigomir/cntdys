import { calendarMonth, getPreviousDay, isLastDayInMonth, walk7Days, getNextDay } from './main'
import { IDay } from './types'

class CalendarElement extends HTMLElement {
  private year: number
  private month: number
  private day: number
  private template: HTMLTemplateElement

  constructor() {
    super()
    this.template = document.createElement('template')
    this.template.innerHTML = `
      <style>
        :host {
        --main-color: #e4e7e7;
        --selected-color: #00a699;
        --other-day-color: #cacccd;
        --cell-size: 37px;
        --border-width: 0.05em;
        --other-month-visibility: visible;
        display: inline-block;
      }
      .week {
        display: flex;
      }
      .day {
        width: var(--cell-size);
        height: var(--cell-size);
        text-align: center;
        border: var(--border-width) solid var(--main-color);
        box-sizing: border-box;
        display: flex;
        align-self: center;
        justify-content: center;
        flex-direction: column;
        user-select: none;
      }
      .day.day-name {
        border: var(--border-width) solid transparent;
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
        visibility: var(--other-month-visibility);
      }
      .day.bc {
        border: 0 !important;
      }
      .day.bb {
        border-bottom: var(--border-width) solid var(--main-color);
      }
      .day.bb2 {
        border-bottom: calc(var(--border-width) * 2) solid var(--main-color);
      }
      .day.bt {
        border-top: var(--border-width) solid var(--main-color);
      }
      .day.bt2 {
        border-top: calc(var(--border-width) * 2) solid var(--main-color);
      }
      .day.br {
        border-right: var(--border-width) solid var(--main-color);
      }
      .day.br2 {
        border-right: calc(var(--border-width) * 2) solid var(--main-color);
      }
      .day.bl {
        border-left: var(--border-width) solid var(--main-color);
      }
      .day.bl2 {
        border-left: calc(var(--border-width) * 2) solid var(--main-color);
      }
      </style>
      <div class="content"></div>
    `
    if (window.ShadyCSS) window.ShadyCSS.prepareTemplate(this.template, 'calendar-element')
  }

  private connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.render = this.render.bind(this)
    this.render()
  }

  private render() {
    this.year = Number(this.getAttribute('year'))
    this.month = Number(this.getAttribute('month'))
    this.day = Number(this.getAttribute('day'))

    const prevWeek = (day: IDay) => {
      let dayCounter = { ...day }
      for (let i = 0; i < 7; i++) {
        dayCounter = getPreviousDay(dayCounter.month.year, dayCounter.month.month, dayCounter.dayInMonth)
      }

      return dayCounter
    }

    const isCurrentMonth = (day: IDay, month: number) => day.month.month === month
    const isWeekend = (day: IDay) => day.dayInWeek === 6 || day.dayInWeek === 0

    const calendarDays = calendarMonth(this.year, this.month)
    const weekendClass = (day: IDay) => isWeekend(day) ? 'weekend' : ''
    const currentMonthClass = (day: IDay) => isCurrentMonth(day, this.month) ? 'current-month' : 'bc'
    const isSelectedClass = (day: IDay) =>
      this.day === day.dayInMonth && this.month === day.month.month && this.year === day.month.year ? 'selected' : ''

    const days = `<div data-action="selectDay" class="weeks">
      ${calendarDays
        .map(
          (week, weekNumber) => `
          <div class="week">${week
            .map(
              day =>
                `<div data-day-in-month="${day.dayInMonth}" class="day
                  ${weekendClass(day)}
                  ${isSelectedClass(day)}
                  ${currentMonthClass(day)}
                  ${weekNumber === 0 ? 'bt2' : ''}
                  ${day.dayInMonth === 1 ? 'bl2' : ''}
                  ${day.dayInWeek === 1 ? 'bl2' : ''}
                  ${day.dayInWeek === 0 ? 'br2' : ''}
                  ${isLastDayInMonth(day.month.year, day.month.month, day.dayInMonth) ? 'br2' : ''}
                  ${walk7Days(day, getPreviousDay).month.month !== day.month.month ? 'bt2' : ''}
                  ${walk7Days(day, getNextDay).month.month !== day.month.month ? 'bb2' : ''}
                  ">
                  ${isCurrentMonth(day, this.month) ? day.dayInMonth : ''}
                </div>`
            )
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

    if (this.shadowRoot) {
      const content = this.shadowRoot.querySelector('.content')
      if (content) {
        content.innerHTML = header + days
      }
      const element = this.shadowRoot.querySelector('[data-action=selectDay]')
      if (element) {
        element.addEventListener('click', this.onClick.bind(this))
      }
    }
  }

  private onClick(e: Event) {
    if ((e.target as HTMLElement).classList.contains('day')) {
      const newDay = (e.target as HTMLElement).dataset.dayInMonth
      this.setAttribute('day', newDay || '')
      this.render()

      this.dispatchEvent(
        new CustomEvent('date-selected', {
          bubbles: false,
          detail: {
            day: Number(newDay),
            month: this.month,
            year: this.year
          }
        })
      )
    }
  }

  private disconnectedCallback() {
    if (this.shadowRoot) {
      const element = this.shadowRoot.querySelector('[data-action=selectDay]')
      if (element) {
        element.removeEventListener('click')
      }
    }
  }
}

const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

if ('customElements' in window) {
  window.customElements.define('calendar-element', CalendarElement)
} else {
  loadScript('https://unpkg.com/@webcomponents/webcomponentsjs@1.0.1/webcomponents-sd-ce.js')
    // there is no way around double loading here for firefox :/
    // otherwise we'd need to async load for Chrome and Safari too, which gives us a flash of no content
    .then(e => loadScript('dist/bundle.js'))
}
