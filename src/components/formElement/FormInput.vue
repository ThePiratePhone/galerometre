<template>
  <span class="input-group">
    <label for="xx">{{ label }}</label>
    <input
      id="xx"
      :type
      :placeholder
      :value
      @input="(e) => emit('input', (e.target as HTMLInputElement).value)"
    />
  </span>
</template>
<script setup lang="ts">
const { label, value, placeholder } = defineProps<{
  label: string;
  value?: string;
  placeholder: string;
  type: string;
}>();

const emit = defineEmits<{
  (e: "input", value: string): void;
}>();
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  flex-direction: column;
  font-size: small;
  width: 100%;
  input {
    background-color: #f3f3f5;
    border: none;
    padding: 0.8rem;
    border-radius: 10px;
    font-size: medium;
  }
}
</style>
