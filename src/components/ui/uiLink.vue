<template>
  <RouterLink
    v-if="to"
    :to
    class="ui-link"
    :class="inline ? 'inline' : 'styled'"
  >
    <slot />
  </RouterLink>
  <a
    v-else-if="href"
    :href
    class="ui-link"
    :class="inline ? 'inline' : 'styled'"
  >
    <slot />
  </a>
  <div v-else class="ui-link" :class="inline ? 'inline' : 'styled'">
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
</script>

<style scoped lang="scss">
.ui-link {
  color: var(--brand-ink);
  text-decoration: underline;
}

.styled {
  background-color: var(--brand-indigo);
  text-wrap: nowrap;
  text-decoration: none;
  width: min-content;
  color: white;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-base);
}
</style>
