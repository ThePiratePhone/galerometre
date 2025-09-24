<template>
  <h1>{{ formData[0].name }}</h1>
  <p>{{ formData[0].description }}</p>
  <template v-for="field in formData[0].fields">
    <template v-if="field.type === 'range'">
      <FormRange
        :key="field.id"
        :label="field.label"
        :value="field.range"
        @input="(val) => console.log(val)"
      />
    </template>
    <template v-else-if="field.type === 'input'">
      <FormInput
        :key="field.id"
        :label="field.label"
        :placeholder="field.placeholder"
        :type="field.inputType"
        @input="(val) => console.log(val)"
      />
    </template>
    <template v-else-if="field.type === 'select'">
      <FormSelect
        :key="field.id"
        :label="field.label"
        :options="field.options"
        @input="(val) => console.log(val)"
      />
    </template>
    <template v-else-if="field.type === 'radio'">
      <FormRadio
        :key="field.id"
        :label="field.label"
        :options="field.options"
        @input="(val) => console.log(val)"
      />
    </template>
  </template>
</template>
<script setup lang="ts">
import FormInput from "@/components/formElement/FormInput.vue";
import FormRadio from "@/components/formElement/FormRadio.vue";
import FormRange from "@/components/formElement/FormRange.vue";
import FormSelect from "@/components/formElement/FormSelect.vue";
import DataForm from "@/dataForm";

const formData = DataForm;
</script>
