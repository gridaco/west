import { IsNotEmpty } from "class-validator";

export class StartNewPlayerQuestRequestBody {
  @IsNotEmpty()
  quest: string;
  @IsNotEmpty()
  player: string;
}
