<template>
  <div class="input-group" :class="errored && !selectedValue ? 'errored' : ''">
    <label :for="uid">{{ label }}</label>
    <select
      :id="uid"
      @change="
        (e) => {
          const value = (e.target as HTMLSelectElement).value;
          if (value !== 'other') {
            emit('input', value);
          } else {
            emit('input', '');
          }
        }
      "
      v-model="selectedValue"
    >
      <option
        v-for="option in computedOptions"
        :key="option.label"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
  <FormInput
    v-if="selectedValue === 'other'"
    :label="t('select.other-placeholder')"
    type="text"
    @input="(value) => emit('input', value)"
    :errored="errored && selectedValue === 'other'"
  />
</template>

<script setup lang="ts">
import { computed, ref, useId } from "vue";
import { useI18n } from "vue-i18n";
import FormInput from "./FormInput.vue";

const { label, other, options } = defineProps<{
  label: string;
  options: {
    label: string;
    value: number | string;
  }[];
  other?: boolean;
  errored?: boolean;
}>();

const emit = defineEmits<{
  (e: "input", value: string): void;
}>();

const uid = useId();
const { t } = useI18n();

const selectedValue = ref("");

const computedOptions = computed(() => {
  if (other) {
    return [...options, { label: t("select.other"), value: "other" }];
  }
  return options;
});
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  flex-direction: column;
  font-size: small;
  width: 100%;
  /* Style for the select field */
  select {
    appearance: none; /* remove default OS styles */
    -webkit-appearance: none; /* Safari/Chrome */
    -moz-appearance: none; /* Firefox */

    background-color: #f9f9f9;
    border: 2px solid #ccc;
    border-radius: 8px;
    padding: 10px 40px 10px 12px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }

  /* Hover and focus states */
  select:hover {
    border-color: #888;
  }

  select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }

  /* Style for options (only some browsers apply it) */
  option {
    padding: 10px;
    font-size: 16px;
    background: #fff;
    color: #333;
  }

  option:hover {
    background: #007bff;
    color: #fff;
  }
}

.errored {
  select {
    border: 1px solid red;
  }
}
</style>
