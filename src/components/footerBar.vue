<template>
  <div className="Footer">
    <span className="FooterElement">galeromètre © 2025</span>
    <span className="FooterElement">
      Un projet de
      <a target="_blank" href="https://linktr.ee/coordination.etudiante">
        la coordination étudiante
      </a>
    </span>
    <span className="FooterElement">Réalisé avec ❤️ depuis Grenoble</span>
    <a target="_blank" href="https://github.com/ThePiratePhone/galerometre/">
      mettez-nous une étoile sur GitHub
    </a>
  </div>
</template>

<style scoped lang="scss">
.Footer {
  width: 80%;
  padding: 5vh 10%;
  min-height: 20vh;
  background-color: var(--brand-ink);
  color: white;
  position: relative;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3vh;
}

.FooterElement {
  font-size: 1em;
}

a {
  color: white;
}
</style>
