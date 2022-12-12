import type {
  ChallengeResourceInterface,
  TurnInterface,
  UserResourceInterface,
} from "@/interfaces/from-api.interface";
import { useUserStore } from "@/stores/user";
import axios from "axios";

export default class StatleApiClient {
  private userStore;

  constructor(private readonly baseUrl: string) {
    this.userStore = useUserStore();
  }

  getChallengesList(): Promise<ChallengeResourceInterface[]> {
    return axios
      .get<ChallengeResourceInterface[]>(`${this.baseUrl}/challenges`)
      .then((response) => response.data);
  }

  login(username: string, password: string): Promise<{ access_token: string }> {
    return axios
      .post<{ access_token: string }>(`${this.baseUrl}/auth/login`, {
        username,
        password,
      })
      .then((response) => response.data);
  }

  me(): Promise<UserResourceInterface> {
    return axios
      .get<UserResourceInterface>(`${this.baseUrl}/auth/me`, {
        headers: {
          authorization: `Bearer ${this.userStore.user.jwt}`,
        },
      })
      .then((response) => response.data);
  }

  createUser(
    username: string,
    password: string
  ): Promise<UserResourceInterface> {
    return axios
      .post<UserResourceInterface>(`${this.baseUrl}/users`, {
        username,
        password,
      })
      .then((response) => response.data);
  }

  createTurn(rawResult: string): Promise<void> {
    return axios
      .post(
        `${this.baseUrl}/turns`,
        {
          rawResult,
        },
        {
          headers: {
            authorization: `Bearer ${this.userStore.user.jwt}`,
          },
        }
      )
      .then(() => void 0);
  }

  getSelfTurns(): Promise<TurnInterface[]> {
    return axios
      .get<TurnInterface[]>(`${this.baseUrl}/me/turns`, {
        headers: {
          authorization: `Bearer ${this.userStore.user.jwt}`,
        },
      })
      .then((response) => response.data);
  }
}
