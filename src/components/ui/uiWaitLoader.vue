<template>
  <div class="progress-container">
    <svg class="stat-circle" width="150" height="150" viewBox="0 0 36 36">
      <circle class="bg" cx="18" cy="18" r="14"></circle>
      <circle
        class="progress"
        cx="18"
        cy="18"
        r="14"
        :style="{ strokeDashoffset: strokeDashoffset }"
      ></circle>
      <text x="18" y="20">{{ percentage }}%</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const { percentage } = defineProps<{
  percentage: number;
}>();

const strokeDasharray = 2 * Math.PI * 14;

const strokeDashoffset = computed(() => {
  return strokeDasharray * (1 - showValue.value / 100);
});

const showValue = ref(0);

onMounted(() => {
  const incrementValue = () => {
    if (showValue.value < percentage) {
      showValue.value++;
      setTimeout(incrementValue, 20);
    } else {
      showValue.value = percentage; // fix floating of result
    }
  };

  incrementValue();
});
</script>

<style scoped lang="scss">
.progress-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.stat-circle {
  circle.bg {
    fill: none;
    stroke: #f1f1f1;
    stroke-width: 5;
  }
  circle.progress {
    fill: none;
    stroke: #9198e5;
    stroke-width: 5;
    stroke-dasharray: 88 88;
    stroke-linecap: round;
  }
  text {
    font-size: 7px;
    text-anchor: middle;
    fill: #555;
  }
}
</style>
