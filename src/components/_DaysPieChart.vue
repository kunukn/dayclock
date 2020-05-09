<template functional>
  <div
    :class="[
      { 'days-pie-chart--show-day-graph': props.showDayGraph },
      { 'days-pie-chart--show-full-day-graph': props.showPie },
      'days-pie-chart',
    ]"
  >
    <div :class="[{ active: props.activeDay === 1 }, 'day day--1']">
      <div class="day-inner"></div>
      <div class="day-inner-2"></div>
    </div>
    <div :class="[{ active: props.activeDay === 2 }, 'day day--2']">
      <div class="day-inner"></div>
      <div class="day-inner-2"></div>
    </div>
    <div :class="[{ active: props.activeDay === 3 }, 'day day--3']">
      <div class="day-inner"></div>
      <div class="day-inner-2"></div>
    </div>
    <div :class="[{ active: props.activeDay === 4 }, 'day day--4']">
      <div class="day-inner"></div>
      <div class="day-inner-2"></div>
    </div>
    <div :class="[{ active: props.activeDay === 5 }, 'day day--5']">
      <div class="day-inner"></div>
      <div class="day-inner-2"></div>
    </div>
    <div :class="[{ active: props.activeDay === 6 }, 'day day--6']">
      <div class="day-inner"></div>
      <div class="day-inner-2"></div>
    </div>
    <div :class="[{ active: props.activeDay === 7 }, 'day day--7']">
      <div class="day-inner"></div>
      <div class="day-inner-2"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DaysPieChart',
  props: {
    activeDay: { type: Number, required: true },
    showDayGraph: { type: Boolean, required: false },
    showPie: { type: Boolean, required: false },
  },
}
</script>

<style scoped lang="scss">
.days-pie-chart {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--size);
  height: var(--size);
  transform: rotate($day-skew);
  pointer-events: none;

  &--show-day-graph {
    background: radial-gradient(
      transparent 30%,
      rgba(var(--color-1), 0.3) 40%,
      transparent,
      transparent
    );
  }

  > .day {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: 100% 100%;
    left: calc(50% - var(--size));
    top: calc(50% - var(--size));
    transition: background 500ms;
    pointer-events: all;
    overflow: hidden;

    > .day-inner {
      position: absolute;
      background: rgba(var(--color-day-bg), 1);
      top: 0;
      left: 0;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    > .day-inner-2 {
      position: absolute;
      display: none;
    }

    @for $i from 1 through 7 {
      &--#{$i} {
        transform: rotate($day-angle * $i) skew($day-skew);
        > .day-inner-2 {
          transform: skew(-$day-skew) translate(0, 0);
        }
      }
    }

    &.active {
      _background: radial-gradient(
        transparent,
        rgba(var(--color-1), 1),
        transparent
      );
      > .day-inner {
        background: transparent;
      }
      > .day-inner-2 {
        display: block;
        bottom: calc(var(--size) / -2);
        right: calc(var(--size) / -2);
        border-radius: 50%;
        width: calc(var(--size) / 1);
        height: calc(var(--size) / 1);
        box-shadow: inset 0 0 0 1px var(--color-bg);
        box-shadow: inset 0 0 40px var(--color-1);
        background: radial-gradient(
          transparent,
          rgba(var(--color-1), 1) 40%,
          transparent 80%
        );
        overflow: hidden;
      }
    }
  }

  &--show-full-day-graph {
    > .day > div {
      border-radius: none;
    }
  }
}
</style>
