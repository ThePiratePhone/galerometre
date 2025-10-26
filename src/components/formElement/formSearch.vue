<template>
  <span class="input-group" :class="errored ? 'errored' : ''">
    <label :for="inputId">{{ label }}</label>
    <UiInfo v-if="help" :message="help" />
    <input
      :id="inputId"
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      class="input"
    />
    <ul class="searchElementWraper" v-if="filteredList.length > 1">
      <li
        v-for="searchElement in filteredList"
        :key="searchElement.label"
        class="searchElement"
      >
        <div @click="setSearchElement(searchElement)">
          {{ searchElement.label }}
        </div>
      </li>
    </ul>
    <div
      v-else-if="filteredList.length == 1"
      class="searchElementUnique selected"
      @click="setSearchElement(filteredList[0])"
    >
      {{ filteredList[0].label }}
    </div>
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
  searchList: Array<{ label: string; value: string[] }>;
  help?: string;
  placeholder?: string;
  errored?: boolean;
}>();

const emit = defineEmits<{
  (e: "input", value: string): void;
}>();

function setSearchElement(element: { label: string; value: string[] }) {
  inputValue.value = element.label;

  emit("input", inputValue.value);
}

const debouncedFilter = refDebounced(inputValue, 500);

const hasFilter = computed(() => inputValue.value.trim().length > 0);

const predicate = (node: { label: string; value: string[] }) =>
  hasFilter.value
    ? node.label.toLowerCase().includes(debouncedFilter.value.toLowerCase()) ||
      node.value.some((e) => {
        return e.toLowerCase().includes(debouncedFilter.value.toLowerCase());
      })
    : false;

const filteredList = computed(() => {
  const filter = props.searchList.filter((node) => predicate(node));

  if (filter.length == 1) {
    emit("input", filter[0].label);
  }

  return filter;
});
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
    align-self: center;
    border-radius: 4px;
    border: 1px solid #ccc;
    height: 2em;
    width: calc(100% - 4px);
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
  }
  .searchElementUnique {
    border: 1px solid var(--green-dark);
    margin-top: 8px;
    padding: 4px;
    border-radius: 4px;

    &.selected {
      background-color: var(--green-light);
    }
  }

  &.errored {
    .input {
      border: 1px solid var(--red-dark);
    }
  }
}
</style>
