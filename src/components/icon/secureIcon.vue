<template>
  <div class="heartIcon">
    <div
      class="heartIconSvg"
      :style="{
        backgroundColor: useColor(
          color as 'blue' | 'green' | 'purple',
          'light'
        ),
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        :stroke="useColor(color as 'blue' | 'green' | 'purple', 'dark')"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-shield w-6 h-6 text-blue-600"
        aria-hidden="true"
      >
        <path
          d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        ></path>
      </svg>
    </div>
    <h5 v-if="title">
      {{ title }}
    </h5>
    <h6 v-if="subtitle">
      {{ subtitle }}
    </h6>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import useColor from "../../../tools/color";

defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "currentColor",
  },
});
</script>

<style scoped lang="scss">
.heartIconSvg {
  border-radius: 100%;
  background-color: #e5e5e7;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heartIcon {
  display: flex;
  flex-direction: column;
  align-items: center;

  H5,
  h6 {
    margin: 0;
    text-align: center;
  }

  h6 {
    font-weight: normal;
    font-size: 0.8em;
    color: gray;
  }
}
</style>
