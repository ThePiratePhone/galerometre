import "@/styles/shared.scss";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import enMessages from "./locales/en.json";
import frMessages from "./locales/fr.json";
import ConstructPage from "./pages/constructPage.vue";
import EndPage from "./pages/endPage.vue";
import HomePage from "./pages/homePage.vue";
import RegisterPage from "./pages/registerPage.vue";
import ThanksJoinPage from "./pages/thanksJoinPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/register", component: RegisterPage },
  { path: "/end", component: EndPage },
  { path: "/joined", component: ThanksJoinPage },
  { path: "/autoPage/:page", component: ConstructPage },
];

export const router = createRouter({
  history: createWebHashHistory(),
  strict: false,
  routes,
});

const app = createApp(App);

const browserLanguage = navigator.language.split("-")[0];
const supportedLanguages = ["fr", "en"];

const defaultLanguage = supportedLanguages.includes(browserLanguage)
  ? browserLanguage
  : "en";

const i18n = createI18n({
  locale: defaultLanguage,
  fallbackLocale: "fr",
  messages: {
    fr: frMessages,
    en: enMessages,
  },
});

app.use(i18n);
app.use(router);
app.mount("#app");
