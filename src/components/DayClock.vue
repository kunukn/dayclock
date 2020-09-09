<template>
  <div class="day-clock -center">
    <div class="strap" />
    <div class="container">
      <DaysPieChart
        :activeDay="activeDay"
        :showDayGraph="showDayGraph"
        :showPie="showPie"
      />

      <Days :activeDay="activeDay" :showDayText="showDayText" />

      <div class="days-pie-chart-center-circle"></div>

      <ClockDayInfo
        :clockDayInfoStyle="clockDayInfoStyle"
        :showPercentages="showPercentages"
        :dayPercentageDisplay="dayPercentageDisplay"
        :clockDayInfoTextStyle="clockDayInfoTextStyle"
      />

      <button
        class="clock-arm button"
        :style="clockArmStyle"
        @click="showPercentages = !showPercentages"
        aria-label="toggle percentage text"
      ></button>
      <div
        class="clock-arm-text"
        :style="clockArmStyleText"
        v-show="showPercentages"
      >
        <div
          class="clock-arm-text-inner -center"
          :style="clockArmInnerStyleText"
        >
          <div>
            <div>Week {{ weekNumber }}</div>
            <span class="number">{{ weekPercentageDisplay }}</span
            ><span>%</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isDebugActive" class="debug">
      <span>Debug: </span>
      <label
        >auto-update clock:
        <input type="checkbox" v-model="isUpdateClockActive"
      /></label>
      <input type="range" min="0" max="100" step="1" @input="debugInputRange" />
      <button @click="toggleDebug">close</button>
    </div>
    <div v-show="!isDebugActive" class="theme-selector">
      <button class="theme" aria-label="hotpink" @click="selectTheme1"></button>
      <button class="theme" aria-label="blue" @click="selectTheme2"></button>
      <button
        class="theme toggle-debug"
        aria-label="debug"
        @click="toggleDebug"
      >
        D
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Days from './_Days.vue'
import DaysPieChart from './_DaysPieChart.vue'
import rangeMap from '@/utils/rangeMap'
import getQueryParams from '@/utils/getQueryParams'
import getDate from '@/utils/getDate'
import getWeekNumber from '@/utils/getWeekNumber'
import hexToRgb from '@/utils/hexToRgb'

const totalDaySeconds = 86400
const totalWeekSeconds = 604800
const daySeconds = 86400
const hourSeconds = 3600
const minuteSeconds = 60

const dayAngle = 51.4285714286 // 360 deg / 7 days

export default Vue.extend({
  name: 'DayClock',
  components: {
    Days,
    DaysPieChart,
    ClockDayInfo: () => import('@/components/_ClockDayInfo.vue'),
  },
  props: {},
  data() {
    return {
      activeDay: 0,
      weekPercentage: 0,
      dayPercentage: 0,
      weekNumber: 0,
      showPercentages: true,
      showDayText: true,
      showDayGraph: true,
      showPie: false,
      isUpdateClockActive: true,
      isDebugActive: false,
    }
  },
  computed: {
    clockArmStyle() {
      return {
        transform: `rotate(${360 * this.weekPercentage}deg)`,
      }
    },
    clockArmStyleText() {
      return {
        transform: `rotate(${360 * this.weekPercentage}deg)`,
      }
    },
    clockArmInnerStyleText() {
      return {
        transform: `rotate(${-360 * this.weekPercentage}deg)`,
      }
    },
    clockDayInfoStyle() {
      return {
        transform: `rotate(${-dayAngle / 2 + this.activeDay * dayAngle}deg)`,
      }
    },
    clockDayInfoTextStyle() {
      return {
        transform: `rotate(${dayAngle / 2 + this.activeDay * -dayAngle}deg)`,
      }
    },
    dayPercentageDisplay() {
      return Math.round(100 * this.dayPercentage)
    },
    weekPercentageDisplay() {
      return Math.round(100 * this.weekPercentage)
    },
  },
  methods: {
    updateClock(getDateMethod) {
      let { date, d, h, m, s } = getDateMethod ? getDateMethod() : getDate()

      if (d === 0) d = 7 // Sunday is last

      let currentDaySeconds = h * hourSeconds + m * minuteSeconds + s
      let currentWeekSeconds =
        (d - 1) * daySeconds + h * hourSeconds + m * minuteSeconds + s

      this.activeDay = d
      this.dayPercentage = currentDaySeconds / totalDaySeconds
      this.weekPercentage = currentWeekSeconds / totalWeekSeconds
      this.weekNumber = getWeekNumber(date)

      let title = `${this.weekPercentageDisplay}% Week`
      document.title = title
    },
    selectTheme1() {
      let root = document.documentElement
      root.style.setProperty('--color-1', '255, 105, 180')
      root.style.setProperty('--color-2', '255, 20, 147')
      root.style.setProperty('--color-bg', '255, 255, 255')
      root.style.setProperty('--color-day-bg', '')
      root.style.setProperty('--color-text', '128, 128, 128')
    },
    selectTheme2() {
      let root = document.documentElement
      root.style.setProperty('--color-1', '0, 105, 180')
      root.style.setProperty('--color-2', '30,	144,	255')
      root.style.setProperty('--color-bg', '255, 255, 255')
      root.style.setProperty('--color-day-bg', '')
      root.style.setProperty('--color-text', '128, 128, 128')
    },
    debugInputRange(event) {
      let date = new Date()
      let first = new Date(2020, 1, 3, 0, 0, 0).getTime()
      let last = new Date(2020, 1, 9, 23, 59, 59).getTime()

      let day = rangeMap(event.target.value, 0, 100, first, last)

      let debugDate = new Date(day)

      this.updateClock(() => ({
        date, // for correct week number
        d: debugDate.getDay(),
        h: debugDate.getHours(),
        m: debugDate.getMinutes(),
        s: debugDate.getSeconds(),
      }))
    },
    toggleDebug() {
      this.isDebugActive = !this.isDebugActive
      if (this.isDebugActive) this.isUpdateClockActive = false
      else this.isUpdateClockActive = true
    },
  },
  created() {
    this.updateClock()

    // this.selectTheme1()

    let params = getQueryParams()
    let root = document.documentElement

    let {
      numbers,
      days,
      graph,
      color1,
      color2,
      bg,
      daybg,
      text,
      pie,
      border,
      strap,
    } = params

    if (+numbers === 0) this.showPercentages = false

    if (+days === 0) this.showDayText = false

    if (+graph === 0) this.showDayGraph = false

    if (color1) {
      let rgb = hexToRgb('#' + color1)
      root.style.setProperty(
        '--color-1',
        rgb ? `${rgb.r},${rgb.g},${rgb.b}` : params.color1
      )
    }
    if (color2) {
      let rgb = hexToRgb('#' + color2)
      root.style.setProperty(
        '--color-2',
        rgb ? `${rgb.r},${rgb.g},${rgb.b}` : color2
      )
    }
    if (bg) {
      let rgb = hexToRgb('#' + bg)
      root.style.setProperty(
        '--color-bg',
        rgb ? `${rgb.r},${rgb.g},${rgb.b}` : bg
      )
    }
    if (daybg) {
      let rgb = hexToRgb('#' + daybg)
      root.style.setProperty(
        '--color-day-bg',
        rgb ? `${rgb.r},${rgb.g},${rgb.b}` : daybg
      )
    }

    if (border) {
      let rgb = hexToRgb('#' + border)
      root.style.setProperty(
        '--color-border',
        rgb ? `${rgb.r},${rgb.g},${rgb.b}` : border
      )
    }

    if (strap) {
      let rgb = hexToRgb('#' + strap)
      root.style.setProperty(
        '--color-strap',
        rgb ? `${rgb.r},${rgb.g},${rgb.b}` : strap
      )
    }

    if (text) {
      let rgb = hexToRgb('#' + text)
      root.style.setProperty(
        '--color-text',
        rgb ? `${rgb.r},${rgb.g},${rgb.b}` : text
      )
    }
    if (+pie) {
      this.showPie = true
    }
  },
  mounted() {
    const second = 1000
    this.intervalKey = setInterval(() => {
      this.isUpdateClockActive && this.updateClock()
    }, 10 * second)
  },
  beforeDestroy() {
    clearInterval(this.intervalKey)
  },
})
</script>

<style scoped lang="scss">
.strap {
  background-color: rgba(var(--color-strap), 1);
  width: 30vw;
  height: 100vh;
  transform: translateX(-50%) translateZ(-2px);
  position: absolute;
  left: 50%;
  top: 0;
}

button,
.button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  border: none;
  box-shadow: none;
  background: transparent;
  outline: none;
}

.day-clock {
  width: 100vw;
  min-height: 100vh;
  _min-height: -webkit-fill-available;
  overflow: hidden;
  background: rgba(var(--color-bg), 1);
  z-index: -1;
  transform: translateZ(0);
}

.clock-arm {
  transform-origin: 50% 50%;
  position: absolute;
  top: calc(50% - #{$clock-arm-size / 2});
  left: calc(50% - #{$clock-arm-size / 2});
  width: $clock-arm-size;
  height: $clock-arm-size;
  background: rgba(var(--color-2), 1);
  border-radius: 50%;

  &::before {
    content: '';
    pointer-events: none;
    display: block;
    position: absolute;
    bottom: 0;
    left: calc(50% - #{$clock-arm-size-width/2});
    width: $clock-arm-size-width;
    height: $clock-arm-size-height;
    border-radius: $clock-arm-size-width;
    background: rgba(var(--color-2), 1);
    z-index: -1;
  }
}
.clock-arm-text {
  $size: 12vmin;

  pointer-events: none;
  position: absolute;
  top: calc(50% - #{$size/2});
  left: calc(50% - #{$size/2});
  width: $size;
  height: $size;
  transform-origin: 50% 50%;
  .clock-arm-text-inner {
    transform-origin: 50% 50%;
    position: absolute;
    top: 100%;
    left: 0;
    width: 6em;
    height: $size;
    @include medium-squared {
      height: 3em;
    }
    text-align: left;
    color: rgba(var(--color-2), 1);
    font-weight: bold;
    font-size: 14px;
    @include medium-squared {
      font-size: 16px;
    }
  }

  .number {
    margin-right: 2px;
  }
}

.container {
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  overflow: hidden;
  box-shadow: inset 0 0 0 0px rgba(var(--color-bg), 1);
  border: 2px solid rgba(var(--color-border), 1);
  background: rgba(var(--color-bg), 1);
}

.days-pie-chart-center-circle {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--size-inner-circle);
  height: var(--size-inner-circle);
  background: rgba(var(--color-bg), 1);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.theme-selector {
  position: fixed;
  display: flex;
  align-items: center;
  top: 6px;
  right: 6px;
  > .theme {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 30px;
    line-height: 1;
    color: rgba(var(--color-text), 1);

    + .theme {
      margin-left: 10px;
    }

    &:nth-child(1) {
      background: hotpink;
    }
    &:nth-child(2) {
      background: rgb(0, 105, 180);
    }
  }
}

.debug {
  position: absolute;
  top: 4px;
  right: 4px;
  color: rgba(var(--color-text), 1);
  input[type='range'] {
    margin-left: 2px;
    margin-right: 6px;
  }
  button {
    box-shadow: 0 0 0 1px rgba(var(--color-text), 1);
    padding: 4px 8px;
    color: inherit;
  }
}
</style>
