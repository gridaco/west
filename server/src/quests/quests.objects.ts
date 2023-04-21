import { ApiProperty } from "@nestjs/swagger";
import type { ChallengeType as TChallengeType } from "@prisma/client";
import { ChallengeType } from "@prisma/client";
import { Type } from "class-transformer";
import {
  Min,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsIn,
  IsBoolean,
  IsNumber,
} from "class-validator";

const CHALLEGE_TYPES = Object.values(ChallengeType);

export class RewardDto {
  @ApiProperty()
  currency?: string;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  amount: number;
}

class InlineCreateChallenge {
  @ApiProperty()
  @IsOptional()
  memo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(CHALLEGE_TYPES)
  type: TChallengeType;

  @ApiProperty()
  @IsNotEmpty()
  resource: string;

  @ApiProperty()
  @IsNotEmpty()
  condition: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RewardDto)
  reward: RewardDto;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  mandatory?: boolean;
}

export class CreateNewQuestRequestBody {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      "The currency code for the quest if specified, the challenge rewards and bonus will be use this currency if not specified.",
  })
  currency?: string;

  @ApiProperty()
  @IsOptional()
  memo?: string;

  @ApiProperty({
    default: {
      currency: "USD",
      amount: 0,
    },
    description: "The bonus reward for completing the quest",
  })
  @IsOptional()
  bonus?: RewardDto;

  @ApiProperty({
    type: InlineCreateChallenge,
    isArray: true,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InlineCreateChallenge)
  challenges?: ReadonlyArray<InlineCreateChallenge>;
}
