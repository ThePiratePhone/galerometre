<template>
  <div v-if="!data">
    <p>Error while loading the form</p>
  </div>
  <div v-else class="page">
    <h1 v-if="data.name" class="title">{{ data.name }}</h1>
    <p v-if="data.description" class="subtitle">{{ data.description }}</p>
    <template v-for="field in data.fields" :key="field.qu_id">
      <template v-if="field.qu_format === 'text'">
        <FormInput
          :label="field.qu_text"
          type="text"
          @input="updateAnswer(field.qu_id, $event)"
          :errored="requiredOnSubmit && !getAnswer(field.qu_id)"
        />
      </template>
      <template v-else-if="field.qu_format === 'number'">
        <FormInput
          :label="field.qu_text"
          type="number"
          @input="updateAnswer(field.qu_id, $event)"
          :errored="requiredOnSubmit && !getAnswer(field.qu_id)"
        />
      </template>
      <template v-else-if="field.qu_format === 'select'">
        <FormSelect
          :label="field.qu_text"
          :options="
            Object.entries(field.qu_issues).map(([key, label]) => ({
              label: label as string,
              value: key,
            }))
          "
          other
          @input="updateAnswer(field.qu_id, $event)"
          :errored="requiredOnSubmit && !getAnswer(field.qu_id)"
        />
      </template>
      <template v-else-if="field.qu_format === 'radio'">
        <FormRadio
          :label="field.qu_text"
          :options="
            Object.entries(field.qu_issues).map(([key, label]) => ({
              label: label as string,
              value: key,
            }))
          "
          @input="updateAnswer(field.qu_id, $event)"
          :errored="requiredOnSubmit && !getAnswer(field.qu_id)"
        />
      </template>
      <template v-else-if="field.qu_format === 'true_false'">
        <FormTrueFalse
          :label="field.qu_text"
          :options="
            Object.entries(field.qu_issues).map(([key, label], i) => ({
              label: label as string,
              value: key,
              color: i === 0 ? 'green' : 'red',
            }))
          "
          @input="updateAnswer(field.qu_id, $event)"
          :errored="requiredOnSubmit && !getAnswer(field.qu_id)"
        />
      </template>
    </template>
    <UiLink @click="next">{{ t("next-pages") }}</UiLink>
  </div>
</template>

<script setup lang="ts">
import FormInput from "@/components/formElement/FormInput.vue";
import FormRadio from "@/components/formElement/FormRadio.vue";
import FormSelect from "@/components/formElement/FormSelect.vue";
import FormTrueFalse from "@/components/formElement/FormTrueFalse.vue";
import UiLink from "@/components/ui/uiLink.vue";
import reqestManager from "@/tools/reqestManager";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();

const pageLine = [
  [-Infinity, 8],
  [8, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, Infinity],
];

const requiredOnSubmit = ref(false);
const response = ref<{ id: number | string; answer: string }[]>([]);

const page = computed(() => route.params.page);
const data = computed(() => {
  try {
    const result = reqestManager.questions(locale.value, Number(page.value));
    if (!result || !result.fields) {
      return undefined;
    }
    return result;
  } catch (error) {
    console.error("Error loading questions:", error);
    return undefined;
  }
});

function updateAnswer(id: number, value: string) {
  response.value.push({ id, answer: value });
}

function getAnswer(id: number) {
  return response.value.find((res) => res.id === id)?.answer;
}

function next() {
  if (!data.value) return;

  if (data.value?.fields.some((f) => !getAnswer(f.qu_id))) {
    requiredOnSubmit.value = true;
    return;
  }

  try {
    const response = reqestManager.sendResponse(
      data.value.fields.map((f) => ({
        id: f.qu_id,
        answer: getAnswer(f.qu_id) ?? "",
      })) ?? []
    );

    if (!response) {
      alert("Error while sending the response");
      return;
    }

    const nextPage = pageLine.find(
      (e) => e[0] === (data.value ? page.value : 1)
    )?.[1];

    if (nextPage == Infinity) {
      router.push({ path: `/register` });
      return;
    }

    router.push({ path: `/autoPage/${nextPage ?? 1}` });
  } catch (error) {
    console.error("Error processing next:", error);
    alert("An error occurred. Please try again.");
  }
}
</script>

<style lang="css" scoped>
.page {
  margin: 2vh;
  padding: 2vh;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 2vh;

  h1 {
    text-align: center;
  }
}
</style>
