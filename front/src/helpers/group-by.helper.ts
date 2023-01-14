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
      if (!groupedTurns.find((group) => group.title === turn.date)) {
        groupedTurns.push({ title: turn.date, turns: [] });
      }

      groupedTurns.find((group) => group.title === turn.date)!.turns.push(turn);

      return groupedTurns;
    }, groupedTurns);
  }

  return [];
}
