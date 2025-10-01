<template>
  <span class="input-group spoler">
    <label for="xx">{{ label }}</label>
    <div>
      <button
        id="xx"
        v-for="option in options"
        :key="option.label"
        @click="selectOption(option.label)"
        :class="{ selected: selectedOption === option.label }"
        :style="
          selectedOption === option.label
            ? {
                backgroundColor: useColor(option.color, 'dark'),
              }
            : {}
        "
      >
        {{ option.label }}
      </button>
    </div>
  </span>
</template>

<script setup lang="ts">
import useColor from "@/tools/color";
import { ref } from "vue";

const { label, options } = defineProps<{
  label: string;
  options: {
    label: string;
    color: "blue" | "green" | "purple" | "red";
  }[];
}>();
const emit = defineEmits<{
  (e: "input", value: string): void;
}>();

const selectedOption = ref<string | null>(null);

function selectOption(label: string) {
  selectedOption.value = label;
  emit("input", label);
}
</script>

<style lang="scss" scoped>
.input-group {
  color: black;
  display: flex;
  flex-direction: column;
  gap: 2vw;

  div {
    width: 100%;
    display: flex;
    gap: 2vw;
  }

  button {
    color: white;
    border: none;
    width: 100%;
    padding: 0.5rem;
    border-radius: 10px;
    font-size: small;
    border-radius: 5px;
    background-color: grey;
    cursor: pointer;
  }
}
</style>
