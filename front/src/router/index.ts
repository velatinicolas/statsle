import AuthenticationPanel from "@/components/AuthenticationPanel.vue";
import ChallengesList from "@/components/ChallengesList.vue";
import TurnForm from "@/components/TurnForm.vue";
import TurnsList from "@/components/TurnsList.vue";
import { useStatleApiClientStore } from "@/stores/statle-api-client";
import { useToasterStore } from "@/stores/toaster";
import { useUserStore } from "@/stores/user";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: AuthenticationPanel },
  { path: "/challenges", component: ChallengesList },
  { path: "/welcome", component: TurnForm },
  { path: "/stats", component: TurnsList },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to) => {
  // Remove any message in toaster on a page change
  const toasterStore = useToasterStore();
  toasterStore.reset();

  const userStore = useUserStore();
  const statleApiClientStore = useStatleApiClientStore();
  if (to.path !== "/") {
    // If hitting any other page than homepage, check if the user is authenticated.
    // If not, redirect to homepage.
    return statleApiClientStore.client
      .checkAuthenticated(userStore.user.jwt)
      .then(() => true)
      .catch(() => ({ path: "/" }));
  } else {
    // If hitting homepage while authenticated, then redirect to welcome page.
    // Otherwise, stay on homepage.
    return statleApiClientStore.client
      .checkAuthenticated(userStore.user.jwt)
      .then(() => ({ path: "/welcome" }))
      .catch(() => true);
  }
});

export default router;
