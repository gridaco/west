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
