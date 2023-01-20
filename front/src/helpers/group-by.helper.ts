import type { TurnInterface } from "@/interfaces/from-api.interface";

export enum TurnsGroupByEnum {
  DATE = "DATE",
  GAME = "GAME",
  CHALLENGE = "CHALLENGE",
}

export type TurnsInterfaceGroups = {
  title: string;
  turns: TurnInterface[];
}[];

export function groupBy(
  turns: TurnInterface[],
  attribute: TurnsGroupByEnum
): TurnsInterfaceGroups {
  if (attribute === TurnsGroupByEnum.DATE) {
    const groupedTurns: TurnsInterfaceGroups = [];

    return turns.reduce((groupedTurns, turn) => {
      // Date must be actually rebuilt from createdAt
      // in order to use the correct timezone
      const date = new Date(turn.createdAt).toLocaleDateString();

      if (!groupedTurns.find((group) => group.title === date)) {
        groupedTurns.push({ title: date, turns: [] });
      }

      groupedTurns.find((group) => group.title === date)!.turns.push(turn);

      return groupedTurns;
    }, groupedTurns);
  }

  return [];
}
