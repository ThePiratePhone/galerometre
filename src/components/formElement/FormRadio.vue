<template>
  <span class="input-group">
    <label for="xx">{{ label }}</label>
    <button
      v-for="option in options"
      :key="option.label"
      @click="emit('input', option.label)"
    >
      {{ option.label }}
    </button>
  </span>
</template>
<script setup lang="ts">
const { label, options } = defineProps<{
  label: string;
  options: {
    label: string;
  }[];
}>();
const emit = defineEmits<{
  (e: "input", value: string): void;
}>();
</script>
