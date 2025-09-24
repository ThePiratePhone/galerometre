<template>
  <span class="input-group">
    <label for="xx">{{ label }}</label>
    <div class="value">{{ value }}</div>
    <input
      id="xx"
      type="range"
      :min="limit[0]"
      :max="limit[1]"
      v-model="value"
      @input="
        (e) => emit('input', Number((e.target as HTMLInputElement).value))
      "
    />
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { label, value: limit } = defineProps<{
  label: string;
  value: [number, number];
}>();

const value = ref(limit[0]);

const emit = defineEmits<{
  (e: "input", value: number): void;
}>();
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}
</style>
