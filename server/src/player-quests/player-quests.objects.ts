import { ConflictException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class StartNewPlayerQuestRequestBody {
  @ApiProperty()
  @IsNotEmpty()
  quest: string;

  @ApiProperty()
  @IsNotEmpty()
  player: string;
}

export class TooManyPlayerQuestResponseData extends ConflictException {
  constructor(
    readonly player: string,
    readonly quest: string,
    readonly n: number,
    readonly conccurency: number,
    readonly instances: string[],
  ) {
    super(
      `Player ${player} already has ${n} quests of id ${quest}, which has a conccurency limit of ${conccurency}. Instances: ${instances.join(
        ", ",
      )}`,
    );
  }
}
