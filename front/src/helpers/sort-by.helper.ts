import type { TurnInterface } from "@/interfaces/from-api.interface";

export enum TurnsSortByEnum {
  DATE = "DATE",
  GAME = "GAME",
  CHALLENGE = "CHALLENGE",
}

export function sortBy(
  turns: TurnInterface[],
  attribute: TurnsSortByEnum
): TurnInterface[] {
  if (attribute === TurnsSortByEnum.CHALLENGE) {
    return turns.sort((previousTurn, turn) =>
      previousTurn.game.challenge.name < turn.game.challenge.name ? -1 : 1
    );
  }

  return turns;
}
