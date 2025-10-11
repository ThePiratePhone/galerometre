<template>
  <span class="input-group spoler" :class="errored ? 'errored' : ''">
    <label :for="inputId">{{ label }}</label>
    <div class="value">{{ value }}</div>
    <input
      :id="inputId"
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
import { ref, useId } from "vue";

const inputId = useId();

const { label, value: limit } = defineProps<{
  label: string;
  value: [number, number];
  errored: boolean;
}>();

const value = ref(limit[0]);

const emit = defineEmits<{
  (e: "input", value: number): void;
}>();
</script>

<style scoped>
.input-group {
  color: black;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  &.errored {
    border: 1px solid red;
  }
}
</style>
