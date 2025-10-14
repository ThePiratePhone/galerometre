<template>
  <span class="input-group spoler" :class="errored ? 'errored' : ''">
    <label :for="inputId">{{ label }}</label>
    <UiInfo v-if="help" :message="help" />
    <div class="button-warper">
      <button
        :id="inputId"
        v-for="option in options"
        :key="option.label"
        @click="selectOption(option.value)"
        :class="{ selected: selectedOption === option.value }"
        :style="{
          backgroundColor: useColor(
            (option.color ??
              option.label.toLowerCase().includes(t('aprobation')))
              ? 'green'
              : 'red',
            selectedOption === option.value ? 'dark' : 'light'
          ),
          color: selectedOption === option.value ? 'white' : 'black',
        }"
      >
        {{ option.label }}
      </button>
    </div>
  </span>
</template>

<script setup lang="ts">
import useColor from "@/tools/color";
import { ref, useId } from "vue";
import { useI18n } from "vue-i18n";
import UiInfo from "../ui/uiInfo.vue";

const inputId = useId();
const { t } = useI18n();

const { label, options } = defineProps<{
  label: string;
  options: {
    label: string;
    value: string;
    color?: "blue" | "green" | "purple" | "red";
  }[];
  errored: boolean;
  help?: string;
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

  div.button-warper {
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
    gap: 1vw;
  }

  &.errored {
    border: 1px solid var(--red-dark);
  }
}
</style>
