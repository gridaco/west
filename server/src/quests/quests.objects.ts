import { ApiProperty } from "@nestjs/swagger";
import { ChallengeType } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsInt,
  Min,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";

class InlineCreateChallenge {
  @ApiProperty()
  @IsOptional()
  memo?: string;

  @ApiProperty()
  @IsNotEmpty()
  type: ChallengeType;

  @ApiProperty()
  @IsNotEmpty()
  resource: string;

  @ApiProperty()
  @IsNotEmpty()
  condition: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  reward: number;
}

export class CreateNewQuestRequestBody {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  currency: string;

  @ApiProperty()
  @IsOptional()
  memo?: string;

  @ApiProperty({
    type: InlineCreateChallenge,
    isArray: true,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InlineCreateChallenge)
  challenges?: ReadonlyArray<InlineCreateChallenge>;
}
