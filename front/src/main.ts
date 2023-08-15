import { createApp, h } from "vue";

import "./assets/main.css";
import "./assets/loader.css";
import StatsleApp from "./StatsleApp.vue";
import { createPinia } from "pinia";
import router from "./router";

const app = createApp({
  render: () => h(StatsleApp),
});

const pinia = createPinia();
app.use(pinia);

app.use(router);

app.mount("#app");
