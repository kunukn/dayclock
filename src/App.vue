<template>
  <div id="app">
    <DayClock />
  </div>
</template>

<script>
import DayClock from '@/components/DayClock.vue'

export default {
  name: 'App',
  components: {
    DayClock,
  },
}
</script>

<style lang="scss">
:root {
  --color-1: 255, 105, 180;
  --color-2: 255, 20, 147;
  --color-bg: 255, 255, 255;
}

* {
  position: relative;
  margin: 0;
  padding: 0;
  font-size: 100%;
}
*,
:before,
:after {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}

.-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
