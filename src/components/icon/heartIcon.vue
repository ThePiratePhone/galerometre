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
        :stroke="useColor(color as 'blue' | 'green' | 'purple', 'dark')"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-heart w-8 h-8 text-primary"
        aria-hidden="true"
        fill="none"
      >
        <path
          d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
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
    validator: (value: string) => ["blue", "green", "purple"].includes(value),
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
