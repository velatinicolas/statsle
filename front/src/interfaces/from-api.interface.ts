// TODO use SDK to share API interface
export interface TurnInterface {
  identifier: string;
  game: {
    challenge: {
      name: string;
      url: string;
    };
    number: number;
  };
  date: string;
  rawResult: string;
  result: string;
  score: string;
}

// TODO use SDK to share API interface
export interface ChallengeResourceInterface {
  identifier: number;
  name: string;
  url: string;
}

// TODO use SDK to share API interface
export interface UserResourceInterface {
  identifier: string;
  username: string;
  email: string | null;
  createdAt: string;
}
