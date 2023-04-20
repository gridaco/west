import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateNewPlayerRequestBody {
  @IsNotEmpty()
  identifier: string;
  @IsEmail()
  @IsOptional()
  email?: string | null;
  @IsOptional()
  username?: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  metadata?: object;
}
