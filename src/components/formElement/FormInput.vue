<template>
  <span class="input-group" :class="errored ? 'errored' : ''">
    <label :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      :type
      :placeholder
      :value
      @input="(e) => emit('input', (e.target as HTMLInputElement).value)"
    />
  </span>
</template>
<script setup lang="ts">
import { useId } from "vue";

const inputId = useId();

const { label, value, placeholder } = defineProps<{
  label: string;
  value?: string;
  type: string;
  placeholder?: string;
  errored?: boolean;
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
    border: 1px solid #f3f3f5;
    padding: 0.8rem;
    border-radius: 10px;
    font-size: medium;
  }
}

.errored {
  input {
    border: 1px solid red;
  }
}
</style>
