<template>
  <span class="input-group" :class="errored ? 'errored' : ''">
    <label :for="inputId">{{ label }}</label>
    <UiInfo v-if="help" :message="help" />
    <input :id="inputId" :type :placeholder v-model="internalValue" />
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useId } from "vue";
import UiInfo from "../ui/uiInfo.vue";

const inputId = useId();

const { label, value, placeholder } = defineProps<{
  label: string;
  type: string;
  value?: string;
  help?: string;
  placeholder?: string;
  errored?: boolean;
}>();

const emit = defineEmits<{
  (e: "input", value: string): void;
}>();

const internalValue = ref(value == undefined ? "" : value);

watch(internalValue, (newValue) => {
  emit("input", newValue);
});
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
    border: 1px solid #df345e;
  }
}
</style>
