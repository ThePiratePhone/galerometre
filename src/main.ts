import "@/styles/shared.scss";
import { createApp } from "vue";

import { createMemoryHistory, createRouter } from "vue-router";
import App from "./App.vue";
import ConstructPage from "./pages/constructPage.vue";
import HomePage from "./pages/homePage.vue";
import { createI18n } from "vue-i18n";

import frMessages from "./locales/fr.json";
import enMessages from "./locales/en.json";
import EndPage from "./pages/endPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/form", component: ConstructPage },
  { path: "/end", component: EndPage },
];

export const router = createRouter({
  history: createMemoryHistory(),
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
