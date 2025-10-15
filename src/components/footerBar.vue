<template>
  <div className="Footer">
    <span>
      <img src="@/assets/logoWhite.png" alt="Logo du Galéromètre" width="100" />
    </span>
    <span>
      <span className="FooterElement">
        Un projet de
        <a target="_blank" href="https://linktr.ee/coordination.etudiante">
          La Coordination étudiante
        </a>
      </span>
      <br />
      <span className="FooterElement">Réalisé avec ❤️ depuis Grenoble</span>
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
}

a {
  color: black;
}
</style>
