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
        class="lucide lucide-users w-6 h-6 text-green-600"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <circle cx="9" cy="7" r="4"></circle>
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
