import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from "class-validator";

export class CreateNewQuestRequestBody {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  currency: string;
  @IsOptional()
  memo?: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InlineCreateChallenge)
  challenges?: ReadonlyArray<InlineCreateChallenge>;
}

class InlineCreateChallenge {
  @IsOptional()
  memo?: string;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  resource: string;
  @IsNotEmpty()
  condition: string;
  @IsNumber()
  reward: number;
}
