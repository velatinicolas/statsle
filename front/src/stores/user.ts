import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface User {
  jwt: string;
  username: string;
}

export const useUserStore = defineStore("user", () => {
  const user = ref<User>({
    jwt: "",
    username: "",
  });
  const isLoggedIn = computed(() => user.value.jwt !== "");
  function reset() {
    user.value.jwt = "";
    user.value.username = "";
  }

  return { user, isLoggedIn, reset };
});
