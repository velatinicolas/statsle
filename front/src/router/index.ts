import AuthenticationPanel from "@/components/AuthenticationPanel.vue";
import ChallengesList from "@/components/ChallengesList.vue";
import PasswordForgottenForm from "@/components/PasswordForgottenForm.vue";
import RecoverPasswordForm from "@/components/RecoverPasswordForm.vue";
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
  {
    path: "/recover-password/:identifier/:token",
    component: RecoverPasswordForm,
    props: true,
  },
  { path: "/password-forgotten", component: PasswordForgottenForm },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to) => {
  const toasterStore = useToasterStore();
  const userStore = useUserStore();
  const statleApiClientStore = useStatleApiClientStore();

  const handleExpiredConnexion = () => {
    userStore.reset();
    toasterStore.error("Connexion expired, please reauthenticate");
    window.localStorage.removeItem("jwt");
  };

  // No authentication check on password recovery page or password forgotten page
  if (
    to.path.startsWith("/recover-password") ||
    to.path === "/password-forgotten"
  ) {
    return true;
  }

  // Remove any message in toaster on a page change,
  // unless we arrive at homepage to display
  // log out message or connexion expired message.
  if (to.path !== "/") {
    toasterStore.reset();
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
      return statleApiClientStore.client
        .checkAuthenticated()
        .then(() => ({
          path: "welcome",
        }))
        .catch(() => {
          handleExpiredConnexion();
          return true;
        });
    }

    return statleApiClientStore.client
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
    return statleApiClientStore.client
      .checkAuthenticated()
      .then(() => true)
      .catch(() => {
        handleExpiredConnexion();
        return { path: "/" };
      });
  }

  return statleApiClientStore.client
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
