import "@/styles/shared.scss";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createWebHistory, createRouter } from "vue-router";
import App from "./App.vue";
import HomePage from "./pages/homePage.vue";

import enMessages from "./locales/en.json";
import frMessages from "./locales/fr.json";
import EndPage from "./pages/endPage.vue";
import RegisterPage from "./pages/registerPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/register", component: RegisterPage },
  { path: "/end", component: EndPage },
  { path: "/:pathMatch(.*)*", redirect: "/" }, // Redirection pour les routes non définies
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

const i18n = createI18n({
  locale: "fr",
  fallbackLocale: "fr",
  messages: {
    fr: frMessages,
    en: enMessages,
  },
});

app.use(i18n);
app.use(router);
app.mount("#app");
