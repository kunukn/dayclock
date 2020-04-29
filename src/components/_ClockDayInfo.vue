<template>
  <div
    class="clock-day-info"
    :style="clockDayInfoStyle"
    v-show="showPercentages"
  >
    <div class="day -center" :style="clockDayInfoTextStyle">
      <div>
        <span class="number">{{ dayPercentageDisplay }}</span
        ><span>%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockDayInfo',
  props: {
    clockDayInfoStyle: { type: Object, required: true },
    clockDayInfoTextStyle: { type: Object, required: true },
    dayPercentageDisplay: { type: Number, required: true },
    showPercentages: { type: Boolean, required: true },
  },
}
</script>

<style scoped lang="scss">
.clock-day-info {
  pointer-events: none;
  position: absolute;
  height: $size / 3;
  width: 40px;
  bottom: calc(50%);
  left: calc(50% - 20px);
  transform-origin: 50% 100%;
  font-size: 14px;
  @media (min-height: 500px) and (min-width: 500px) {
    font-size: 16px;
  }

  .day {
    line-height: 1;
    text-align: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: rgba(var(--color-bg), 1);
    font-weight: bold;
    .number {
      margin-right: 2px;
    }
  }
}
</style>
