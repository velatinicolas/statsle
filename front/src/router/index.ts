import AuthenticationPanel from "@/components/AuthenticationPanel.vue";
import ChallengesList from "@/components/ChallengesList.vue";
import PasswordForgottenForm from "@/components/PasswordForgottenForm.vue";
import RecoverPasswordForm from "@/components/RecoverPasswordForm.vue";
import TurnForm from "@/components/TurnForm.vue";
import TurnsList from "@/components/TurnsList.vue";
import { useStatsleApiClientStore } from "@/stores/statsle-api-client";
import { useToasterStore } from "@/stores/toaster";
import { useUserStore } from "@/stores/user";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: AuthenticationPanel },
  { path: "/challenges", component: ChallengesList },
  { path: "/welcome", component: TurnForm },
  { path: "/stats", component: TurnsList },
  { path: "/list", component: ChallengesList },
  {
    path: "/recover-password/:identifier/:token",
    component: RecoverPasswordForm,
    props: true,
  },
  { path: "/password-forgotten", component: PasswordForgottenForm },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to) => {
  const toasterStore = useToasterStore();
  const userStore = useUserStore();
  const statsleApiClientStore = useStatsleApiClientStore();

  const handleExpiredConnexion = () => {
    userStore.reset();
    toasterStore.error("Connexion expired, please reauthenticate");
    window.localStorage.removeItem("jwt");
  };

  // Remove any message in toaster on a page change,
  // unless we arrive at homepage to display
  // log out message or connexion expired message.
  if (to.path !== "/") {
    toasterStore.reset();
  }

  // No authentication check on password recovery page or password forgotten page
  if (
    to.path.startsWith("/recover-password") ||
    to.path === "/password-forgotten"
  ) {
    return true;
  }

  // Always go to homepage if no jwt stored
  if (!window.localStorage.getItem("jwt")) {
    userStore.reset();

    if (to.path === "/") {
      return true;
    }

    return { path: "/" };
  }

  if (to.path === "/") {
    if (userStore.isLoggedIn) {
      return statsleApiClientStore.client
        .checkAuthenticated()
        .then(() => ({
          path: "welcome",
        }))
        .catch(() => {
          handleExpiredConnexion();
          return true;
        });
    }

    return statsleApiClientStore.client
      .me()
      .then((user) => {
        userStore.user.username = user.username;
        return { path: "welcome" };
      })
      .catch(() => {
        handleExpiredConnexion();
        return true;
      });
  }

  if (userStore.isLoggedIn) {
    return statsleApiClientStore.client
      .checkAuthenticated()
      .then(() => true)
      .catch(() => {
        handleExpiredConnexion();
        return { path: "/" };
      });
  }

  return statsleApiClientStore.client
    .me()
    .then((user) => {
      userStore.user.username = user.username;
      return true;
    })
    .catch(() => {
      handleExpiredConnexion();
      return { path: "/" };
    });
});

export default router;
