import { IsNotEmpty } from "class-validator";

export class AppCreateRequestBody {
  @IsNotEmpty()
  name: string;

  description: string;
}
