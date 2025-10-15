<script setup lang="ts"></script>

<template>
  <div class="Footer">
    <span class="left">
      <img src="@/assets/logoWhite.png" alt="Logo du Galéromètre" width="100" />
      <select v-model="$i18n.locale">
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
    </span>
    <span>
      <span class="FooterElement">
        Un projet de
        <a target="_blank" href="https://linktr.ee/coordination.etudiante">
          La Coordination étudiante
        </a>
      </span>
      <br />
      <span class="FooterElement">Réalisé avec ❤️ depuis Grenoble</span>
      <br />

      <a target="_blank" href="https://github.com/ThePiratePhone/galerometre/">
        Mettez-nous une étoile sur GitHub
      </a>
    </span>
  </div>
</template>

<style scoped lang="scss">
.Footer {
  width: 90%;
  padding: 2vh 5%;
  background-color: silver;
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  gap: 3vh;
  font-size: 0.8em;

  .left {
    gap: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}

a {
  color: black;
}
</style>
