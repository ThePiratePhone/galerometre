<template>
  <div class="input-group">
    <label :for="uid">{{ label }}</label>
    <select
      :id="uid"
      @change="(e) => emit('input', (e.target as HTMLSelectElement).value)"
    >
      <option
        v-for="option in options"
        :key="option.label"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useId } from "vue";

const { label } = defineProps<{
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}>();
const emit = defineEmits<{
  (e: "input", value: string): void;
}>();

const uid = useId();
</script>
