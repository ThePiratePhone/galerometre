<template>
  <div class="page">
    <div>
      <h1>Bienvenu dans le galerometre</h1>
      <p>
        ici tu peut nous aider a remonté la precarité reel et grandissante des
        etudant.
      </p>
    </div>
    <SecureIcon
      title="securisé"
      subtitle="nous ne communiquons jamais tes informations"
      color="blue"
    />
    <TeamIcon
      title="utile"
      subtitle="nous te donneront ton score de hess a la fin du formulaire"
      color="green"
    />
    <HeartIcon
      title="civique"
      subtitle="chaque formulaire permet d'aider les autre"
      color="purple"
    />
    <div class="spoler">
      Cette évaluation couvre les aspects financiers, sociaux et scolaires de la
      vie étudiante. Elle dure environ 5 à 7 minutes. Vos réponses sincères nous
      aideront à decrire la realité etudiante
    </div>
    <button>demarré le questionnaire</button>
  </div>
</template>

<script setup lang="ts">
import HeartIcon from "@/components/icon/heartIcon.vue";
import SecureIcon from "@/components/icon/secureIcon.vue";
import TeamIcon from "@/components/icon/teamIcon.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped lang="scss">
.page {
  margin: 2vh;
  padding: 2vh;
  border: 1px solid silver;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 2vh;

  h1,
  p {
    text-align: center;
  }

  p {
    color: gray;
    line-height: 1.5em;
  }

  .spoler {
    font-size: 0.8em;
    color: gray;
    text-align: center;
    background-color: #f5f5f7;
    padding: 2vh;
    border-radius: 10px;
  }

  button {
    background-color: black;
    color: white;
    border: none;
    padding: 1em;
    border-radius: 10px;
    font-size: 1em;
    cursor: pointer;
  }
}
</style>
