<template functional>
  <div
    :class="[
      { 'days-pie-chart--show-day-graph': props.showDayGraph },
      { 'days-pie-chart--show-full-day-graph': props.showPie },
      'days-pie-chart',
    ]"
  >
    <div :class="[{ active: props.activeDay === 1 }, 'day day--1']">
      <div></div>
    </div>
    <div :class="[{ active: props.activeDay === 2 }, 'day day--2']">
      <div></div>
    </div>
    <div :class="[{ active: props.activeDay === 3 }, 'day day--3']">
      <div></div>
    </div>
    <div :class="[{ active: props.activeDay === 4 }, 'day day--4']">
      <div></div>
    </div>
    <div :class="[{ active: props.activeDay === 5 }, 'day day--5']">
      <div></div>
    </div>
    <div :class="[{ active: props.activeDay === 6 }, 'day day--6']">
      <div></div>
    </div>
    <div :class="[{ active: props.activeDay === 7 }, 'day day--7']">
      <div></div>
    </div>
  </div>
</template>

<script>
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
    background: radial-gradient(transparent, rgba(var(--color-1), 0.3));
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

    @for $i from 1 through 7 {
      &--#{$i} {
        transform: rotate($day-angle * $i) skew($day-skew);
      }
    }

    > div {
      position: absolute;
      background: rgba(var(--color-day-bg), 1);
      top: 0;
      left: 0;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }

    &.active {
      background: radial-gradient(
        transparent,
        rgba(var(--color-1), 1),
        transparent
      );
      > div {
        background: transparent;
      }
    }
  }

  &--show-full-day-graph {
    > .day > div {
      border-radius: 0;
    }
  }
}
</style>
