import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PlayerService } from "./players.service";
import { CreateNewPlayerRequestBody } from "./players.objects";
import { ApiKeyGuard, AuthorizedAppRequest } from "api-key";

@UseGuards(ApiKeyGuard)
@Controller("/players")
export class PlayerController {
  constructor(private readonly service: PlayerService) {}

  @Post()
  async new(
    @Req() request: AuthorizedAppRequest,
    @Body() body: CreateNewPlayerRequestBody,
  ) {
    return this.service.create({
      app: request.app,
      ...body,
    });
  }

  @Get("/:id/quests")
  async playerQuests(
    @Param("id") id: string,
    @Req() request: AuthorizedAppRequest,
  ) {
    this.service.quests({
      player: id,
    });
  }
}
