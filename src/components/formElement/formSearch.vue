<template>
  <span class="input-group" :class="errored ? 'errored' : ''">
    <label :for="inputId">{{ label }}</label>
    <UiInfo v-if="help" :message="help" />
    <input
      :id="inputId"
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      @input="handleInput"
    />
    <ul>
      <li
        v-for="searchElement in filteredList"
        :key="searchElement.label"
        class="serachElent"
      >
        <template
          v-if="
            Array.isArray(searchElement.label) && searchElement.label.length > 0
          "
        >
          {{ searchElement.label[0] }}
        </template>
        <template v-else-if="!Array.isArray(searchElement.label)">
          {{ searchElement.label }}
        </template>
      </li>
    </ul>
  </span>
</template>

<script setup lang="ts">
import { refDebounced } from "@vueuse/shared";
import { computed, ref, useId } from "vue";
import UiInfo from "../ui/uiInfo.vue";

const inputId = useId();
const inputValue = ref("");

const props = defineProps<{
  label: string;
  searchList: Array<{ label: string; value: string | string[] }>;
  help?: string;
  placeholder?: string;
  errored?: boolean;
}>();

function useFilter() {
  const filter = ref("");
  const debouncedFilter = refDebounced(filter, 200);
  const hasFilter = computed(() => filter.value.trim().length > 0);
  const predicate = (node: { label: string; value: string | string[] }) =>
    hasFilter.value
      ? node.label.toLowerCase().includes(debouncedFilter.value.toLowerCase())
      : true;

  return { filter, predicate };
}

const { filter, predicate } = useFilter();

const filteredList = computed(() => {
  return props.searchList.filter(predicate);
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  filter.value = target.value;
}
</script>

<style>
.serachElent {
  list-style: none;
}
</style>
