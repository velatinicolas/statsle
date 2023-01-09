import type {
  ChallengeResourceInterface,
  TurnInterface,
  UserResourceInterface,
} from "@/interfaces/from-api.interface";
import axios from "axios";
import { defineStore } from "pinia";

export interface User {
  jwt: string;
  username: string;
}

export const useStatleApiClientStore = defineStore("statle-api-client", () => {
  const baseUrl = import.meta.env.VITE_STATLE_API_BASE_URL;
  const client = {
    getChallengesList(): Promise<ChallengeResourceInterface[]> {
      return axios
        .get<ChallengeResourceInterface[]>(`${baseUrl}/challenges`)
        .then((response) => response.data);
    },

    login(
      username: string,
      password: string
    ): Promise<{ access_token: string }> {
      return axios
        .post<{ access_token: string }>(`${baseUrl}/auth/login`, {
          username,
          password,
        })
        .then((response) => response.data);
    },

    checkAuthenticated(): Promise<void> {
      return axios
        .head(`${baseUrl}/auth/me`, {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
          },
        })
        .then(() => void 0);
    },

    me(): Promise<UserResourceInterface> {
      return axios
        .get<UserResourceInterface>(`${baseUrl}/auth/me`, {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
          },
        })
        .then((response) => response.data);
    },

    createUser(
      username: string,
      password: string,
      email: string
    ): Promise<UserResourceInterface> {
      return axios
        .post<UserResourceInterface>(`${baseUrl}/users`, {
          username,
          password,
          email,
        })
        .then((response) => response.data);
    },

    createTurn(rawResult: string): Promise<void> {
      return axios
        .post(
          `${baseUrl}/turns`,
          {
            rawResult,
          },
          {
            headers: {
              authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
            },
          }
        )
        .then(() => void 0);
    },

    getSelfTurns(): Promise<TurnInterface[]> {
      return axios
        .get<TurnInterface[]>(`${baseUrl}/me/turns`, {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
          },
        })
        .then((response) => response.data);
    },

    createPasswordRecovery(username: string): Promise<void> {
      return axios
        .post(`${baseUrl}/password-recoveries`, { username })
        .then(() => void 0);
    },

    usePasswordRecovery(
      identifier: string,
      token: string,
      newPassword: string
    ): Promise<void> {
      return axios
        .post(`${baseUrl}/password-recoveries/${identifier}/use`, {
          token,
          newPassword,
        })
        .then(() => void 0);
    },
  };

  return { client };
});
