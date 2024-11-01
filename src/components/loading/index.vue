<template>
  <div class="wrapper">
    <div class="loading">
      <div class="ball first"></div>
      <div class="ball second"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.wrapper {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #000;
}

.loading {
  position: relative;
  isolation: isolate;
}

.ball {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  mix-blend-mode: multiply;
}

.first {
  background-color: #42ebf7;
  animation: circle 1.3s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.second {
  background-color: #fd2c55;
  animation: circle-second 1.3s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes circle {
  0%,
  100% {
    z-index: 1;
    transform: translateX(-25px) scale(1);
  }

  25% {
    transform: translateX(20px) scale(0.75);
  }

  50% {
    transform: translateX(0) scale(0.5);
  }

  75% {
    transform: translateX(-20px) scale(0.75);
  }
}

@keyframes circle-second {
  0%,
  100% {
    transform: translateX(-25px) scale(0.5);
  }

  25% {
    transform: translateX(-20px) scale(0.75);
  }

  50% {
    z-index: 1;
    transform: translateX(0) scale(1);
  }

  75% {
    transform: translateX(20px) scale(0.75);
  }
}
</style>
