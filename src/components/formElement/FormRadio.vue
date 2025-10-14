<template>
  <span class="input-group spoler" :class="errored ? 'errored' : ''">
    <label :for="inputId">{{ label }}</label>
    <div class="button-warper">
      <button
        :id="inputId"
        v-for="option in options"
        :key="option.label"
        @click="selectOption(option.value)"
        :class="{ selected: selectedOption === option.value }"
        :style="
          selectedOption === option.value
            ? {
                backgroundColor: useColor(option.color ?? 'blue', 'dark'),
              }
            : {
                backgroundColor: useColor(option.color ?? 'blue', 'light'),
                color: 'black',
              }
        "
      >
        {{ option.label }}
      </button>
    </div>
  </span>
</template>

<script setup lang="ts">
import useColor from "@/tools/color";
import { ref, useId } from "vue";

const inputId = useId();

const { label } = defineProps<{
  label: string;
  options: {
    label: string;
    value: string;
    color?: "blue" | "green" | "purple" | "red";
  }[];
  errored: boolean;
}>();

const emit = defineEmits<{
  (e: "input", value: string): void;
}>();

const selectedOption = ref<string | null>(null);

function selectOption(value: string) {
  selectedOption.value = value;
  emit("input", value);
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

  .button-warper {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 1vw;
  }

  &.errored {
    border: 1px solid var(--red-dark);
  }
}
</style>
