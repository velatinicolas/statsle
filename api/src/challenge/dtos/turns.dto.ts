import { IsEnum, IsOptional, ValidateNested } from "class-validator";

enum OrderSortEnum {
  ASC = "ASC",
  DESC = "DESC",
}

class ChallengesOrderDto {
  @IsOptional()
  @IsEnum(OrderSortEnum)
  name?: OrderSortEnum;
}

class GamesOrderDto {
  @IsOptional()
  @ValidateNested()
  challenge?: ChallengesOrderDto;

  @IsOptional()
  @IsEnum(OrderSortEnum)
  number?: OrderSortEnum;
}

export class TurnsOrderDto {
  @IsOptional()
  @IsEnum(OrderSortEnum)
  date?: OrderSortEnum;

  @IsOptional()
  @IsEnum(OrderSortEnum)
  createdAt?: OrderSortEnum;

  @IsOptional()
  @IsEnum(OrderSortEnum)
  score?: OrderSortEnum

  @IsOptional()
  @ValidateNested()
  game?: GamesOrderDto;
}

export class TurnsDto {
  @IsOptional()
  @ValidateNested()
  orders?: TurnsOrderDto;
}

export type TurnsDatabaseOrderDto = Omit<TurnsOrderDto, 'score'>
export type TurnsAdditionalOrderDto = Pick<TurnsOrderDto, 'score'>
