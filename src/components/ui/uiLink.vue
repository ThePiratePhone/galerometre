<template>
  <RouterLink
    v-if="to"
    :to
    class="ui-link"
    :class="inline ? 'inline' : 'styled'"
    @click="$emit('click')"
  >
    <slot />
  </RouterLink>
  <a
    v-else-if="href"
    :href
    class="ui-link"
    :class="inline ? 'inline' : 'styled'"
    @click="$emit('click')"
  >
    <slot />
  </a>
  <div
    v-else
    class="ui-link"
    :class="inline ? 'inline' : 'styled'"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const {
  href,
  to,
  inline = false,
} = defineProps<{
  href?: string;
  to?: string;
  inline?: boolean;
}>();

defineEmits(["click"]);
</script>

<style scoped lang="scss">
.ui-link {
  color: var(--brand-ink);
  text-decoration: underline;
}

.styled {
  background-color: black;
  color: white;
  text-align: center;
  text-decoration: none;
  border: none;
  padding: 1em;
  border-radius: 10px;
  font-size: 1em;
  cursor: pointer;
}
</style>
