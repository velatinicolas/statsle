import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface User {
  username: string;
}

export const useUserStore = defineStore("user", () => {
  const user = ref<User>({
    username: "",
  });
  const isLoggedIn = computed(() => user.value.username !== "");
  function reset() {
    user.value.username = "";
  }

  return { user, isLoggedIn, reset };
});
