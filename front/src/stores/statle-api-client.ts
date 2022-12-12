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
  console.info(import.meta.env);
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

    me(jwt: string): Promise<UserResourceInterface> {
      return axios
        .get<UserResourceInterface>(`${baseUrl}/auth/me`, {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => response.data);
    },

    createUser(
      username: string,
      password: string
    ): Promise<UserResourceInterface> {
      return axios
        .post<UserResourceInterface>(`${baseUrl}/users`, {
          username,
          password,
        })
        .then((response) => response.data);
    },

    createTurn(rawResult: string, jwt: string): Promise<void> {
      return axios
        .post(
          `${baseUrl}/turns`,
          {
            rawResult,
          },
          {
            headers: {
              authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then(() => void 0);
    },

    getSelfTurns(jwt: string): Promise<TurnInterface[]> {
      return axios
        .get<TurnInterface[]>(`${baseUrl}/me/turns`, {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => response.data);
    },
  };

  return { client };
});
