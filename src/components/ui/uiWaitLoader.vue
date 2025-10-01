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
import { ref, watch, onMounted } from "vue";

interface Props {
  percentage: number;
}

const props = defineProps<Props>();

const strokeDasharray = 2 * Math.PI * 14;
const strokeDashoffset = ref(0);

const updateStrokeOffset = () => {
  strokeDashoffset.value = strokeDasharray * (1 - props.percentage / 100);
};

watch(() => props.percentage, updateStrokeOffset);

onMounted(() => {
  updateStrokeOffset();
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
    transition: stroke-dashoffset 0.4s ease;
  }
  text {
    font-size: 7px;
    text-anchor: middle;
    fill: #555;
  }
}
</style>
