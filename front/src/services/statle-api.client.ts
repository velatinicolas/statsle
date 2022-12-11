import type { ChallengeResourceInterface } from "@/interfaces/from-api.interface";
import axios from "axios";

export default class StatleApiClient {
  getChallengesList(): Promise<ChallengeResourceInterface[]> {
    return axios
      .get<ChallengeResourceInterface[]>("http://localhost:3000/challenges")
      .then(response => response.data)
  }
}