import { createApp, h } from "vue";
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from "axios";

import "./assets/main.css";
import Statle from "./Statle.vue";
import Authentication from "./components/Authentication.vue";
import { createPinia } from "pinia";
import ChallengesList from "./components/ChallengesList.vue";
import TurnForm from "./components/TurnForm.vue";
import TurnsList from "./components/TurnsList.vue";

import { useUserStore } from "@/stores/user";
const routes = [
  { path: '/', component: Authentication },
  { path: '/challenges', component: ChallengesList },
  { path: '/welcome', component: TurnForm },
  { path: '/stats', component: TurnsList },
]

const app = createApp({
  render: () => h(Statle),
});
const pinia = createPinia();
const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

app.use(router);
app.use(pinia);


// const userStore = useUserStore()

// router.beforeEach((to) => {
//   if (to.name !== '/') {
//     return axios
//       .head("http://localhost:3000/auth/me", {
//         headers: {
//           authorization: `Bearer ${userStore.user.jwt}`,
//         },
//       })
//       .catch(() => (
//         { name: '/' }
//       ))
//   }
// })

app.mount("#app");
