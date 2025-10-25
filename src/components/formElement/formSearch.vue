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
      class="input"
    />
    <ul class="searchElementWraper" v-if="filteredList.length > 0">
      <li
        v-for="searchElement in filteredList"
        :key="searchElement.label"
        class="searchElement"
      >
        <template
          v-if="
            Array.isArray(searchElement.label) && searchElement.label.length > 0
          "
        >
          <div @click="setSearchElement(searchElement)">
            {{ searchElement.label[0] }}
          </div>
        </template>
        <template v-else-if="!Array.isArray(searchElement.label)">
          <div @click="setSearchElement(searchElement)">
            {{ searchElement.label }}
          </div>
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

function setSearchElement(element: {
  label: string;
  value: string | string[];
}) {
  inputValue.value = Array.isArray(element.label)
    ? element.label[0]
    : element.label;
}

function useFilter() {
  const debouncedFilter = refDebounced(inputValue, 200);
  const hasFilter = computed(() => inputValue.value.trim().length > 0);
  const predicate = (node: { label: string; value: string | string[] }) => {
    const valueToCheck = Array.isArray(node.value)
      ? node.value.join(" ").toLowerCase()
      : node.value.toLowerCase();

    if (!hasFilter.value) {
      return undefined;
    }
    if (valueToCheck === debouncedFilter.value.toLowerCase()) {
      return true;
    }
    return valueToCheck.includes(debouncedFilter.value.toLowerCase());
  };

  return { predicate };
}

const { predicate } = useFilter();

const filteredList = computed(() => {
  const filtered = props.searchList.filter(predicate);
  const input = inputValue.value.trim().toLowerCase();
  return filtered.slice().sort((a, b) => {
    const aValue = Array.isArray(a.value)
      ? a.value.join(" ").toLowerCase()
      : a.value.toLowerCase();
    const bValue = Array.isArray(b.value)
      ? b.value.join(" ").toLowerCase()
      : b.value.toLowerCase();
    const aStarts = input && aValue.startsWith(input);
    const bStarts = input && bValue.startsWith(input);
    if (aStarts && !bStarts) return -1; // Place elements starting with inputValue at the top
    if (!aStarts && bStarts) return 1;
    return aValue.localeCompare(bValue); // Sort alphabetically for the rest
  });
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
}
</script>

<style lang="scss" scoped>
.input-group {
  .input,
  .searchElement,
  .searchElementWraper {
    width: 100%;
    padding: 0%;
    margin: 0%;
  }

  .input {
    font-size: large;
    height: 2em;
  }

  .searchElementWraper {
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: calc(10em + 48px);
    overflow: scroll;
  }

  .searchElement {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 2px 5px 0px;
    background-color: #ccc;
    border-radius: 4px;
    list-style: none;
    padding: 4px;
    width: calc(100% - 8px);
  }
}
</style>
