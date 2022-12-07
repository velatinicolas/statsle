import { createApp } from "vue";
// import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import Statle from "./Statle.vue";
import { createPinia } from "pinia";

// const app = createApp(App);
const app = createApp(Statle);
const pinia = createPinia()

app.use(router);
app.use(pinia)

app.mount("#app");

