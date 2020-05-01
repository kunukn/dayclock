<template functional>
  <div class="days">
    <div :class="[{ active: props.activeDay === 1 }, 'day day--1']">
      <p
        class="text"
        aria-label="monday"
        role="presentation"
        v-if="props.showDayText"
      >
        <i>m</i><i>o</i><i>n</i>
      </p>
    </div>
    <div :class="[{ active: props.activeDay === 2 }, 'day day--2']">
      <p
        class="text"
        aria-label="tuesday"
        role="presentation"
        v-if="props.showDayText"
      >
        <i>t</i><i>u</i><i>e</i>
      </p>
    </div>
    <div :class="[{ active: props.activeDay === 3 }, 'day day--3']">
      <p
        class="text"
        aria-label="wednesday"
        role="presentation"
        v-if="props.showDayText"
      >
        <i>w</i><i>e</i><i>d</i>
      </p>
    </div>
    <div :class="[{ active: props.activeDay === 4 }, 'day day--4']">
      <p
        class="text"
        aria-label="thursday"
        role="presentation"
        v-if="props.showDayText"
      >
        <i>t</i><i>h</i><i>u</i>
      </p>
    </div>
    <div :class="[{ active: props.activeDay === 5 }, 'day day--5']">
      <p
        class="text"
        aria-label="friday"
        role="presentation"
        v-if="props.showDayText"
      >
        <i>f</i><i>r</i><i>i</i>
      </p>
    </div>
    <div :class="[{ active: props.activeDay === 6 }, 'day day--6']">
      <p
        class="text"
        aria-label="saturday"
        role="presentation"
        v-if="props.showDayText"
      >
        <i>s</i><i>a</i><i>t</i>
      </p>
    </div>
    <div :class="[{ active: props.activeDay === 7 }, 'day day--7']">
      <p
        class="text"
        aria-label="sunday"
        role="presentation"
        v-if="props.showDayText"
      >
        <i>s</i><i>u</i><i>n</i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Days',
  props: {
    activeDay: { type: Number, required: true },
    showDayText: { type: Boolean, required: true },
  },
}
</script>

<style scoped lang="scss">
.days {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: var(--size);
  height: var(--size);
  transform: rotate(-26deg);

  .day {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: var(--size);
    height: var(--size);
    text-align: center;
    color: rgba(var(--color-text), 1);
    transition: color 500ms;

    @for $i from 1 through 7 {
      &--#{$i} {
        transform: rotate($day-angle * $i);
      }
    }

    &.active {
      color: rgba(var(--color-bg), 1);
    }

    .text {
      pointer-events: all;
      padding-top: var(--font-air);
      user-select: none;
      text-transform: uppercase;

      font-weight: bold;
      line-height: 1;

      i {
        font-size: var(--font-size);
        line-height: inherit;
        font-style: normal;
        display: inline-block;
        min-width: 0.8em;

        &:nth-child(1) {
          transform: rotate(-$font-deg);
        }
        &:nth-child(2) {
          transform: translateY(var(--font-y-inv));
        }
        &:nth-child(3) {
          transform: rotate($font-deg);
        }
      }
    }
    &--3,
    &--4,
    &--5 {
      .text {
        padding-top: 0;
        padding-bottom: var(--font-air);
        transform: rotate(0.5turn);

        i {
          &:nth-child(1) {
            transform: rotate($font-deg);
          }
          &:nth-child(2) {
            transform: translateY(var(--font-y));
          }
          &:nth-child(3) {
            transform: rotate(-$font-deg);
          }
        }
      }
    }
  }
}
</style>
