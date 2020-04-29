<template>
  <div class="days-pie-chart">
    <div :class="[{ active: activeDay === 1 }, 'day day--1']"></div>
    <div :class="[{ active: activeDay === 2 }, 'day day--2']"></div>
    <div :class="[{ active: activeDay === 3 }, 'day day--3']"></div>
    <div :class="[{ active: activeDay === 4 }, 'day day--4']"></div>
    <div :class="[{ active: activeDay === 5 }, 'day day--5']"></div>
    <div :class="[{ active: activeDay === 6 }, 'day day--6']"></div>
    <div :class="[{ active: activeDay === 7 }, 'day day--7']"></div>
  </div>
</template>

<script>
export default {
  name: 'DaysPieChart',
  props: {
    activeDay: { type: Number, required: true },
  },
}
</script>

<style scoped lang="scss">
.days-pie-chart {
  position: absolute;
  top: 0;
  left: 0;
  width: $size;
  height: $size;
  transform: rotate($day-skew);
  pointer-events: none;

  .day {
    position: absolute;
    box-shadow: 0 0 0 1px $border-color;
    width: $size;
    height: $size;
    width: 100%;
    height: 100%;
    transform-origin: 100% 100%;
    left: calc(50% - #{$size});
    top: calc(50% - #{$size});
    transition: background 500ms;
    pointer-events: all;

    @for $i from 1 through 7 {
      &--#{$i} {
        transform: rotate($day-angle * $i) skew($day-skew);
      }
    }

    &.active {
      background: radial-gradient(
        rgba(var(--color-1), 0.9),
        rgba(var(--color-1), 0.8)
      );
    }
  }
}
</style>
