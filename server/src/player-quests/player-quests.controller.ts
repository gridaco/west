import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PlayerQuestsService } from "./player-quests.service";
import { StartNewPlayerQuestRequestBody } from "./player-quests.objects";
import { ApiKeyGuard, AuthorizedAppRequest } from "api-key";

@Controller("/players/quests")
@UseGuards(ApiKeyGuard)
export class PlayerQuestsController {
  constructor(private readonly service: PlayerQuestsService) {}

  @Post("/start")
  async new(
    @Req() request: AuthorizedAppRequest,
    @Body() body: StartNewPlayerQuestRequestBody,
  ) {
    return this.service.create({
      app: request.app,
      ...body,
    });
  }

  @Get("/:id")
  async get(
    @Param("id") id: string,
    @Req() request: AuthorizedAppRequest,
    @Body() body,
  ) {
    return this.service.get(id);
  }

  @Get("/:id/check")
  async check(
    @Param("id") id: string,
    @Req() request: AuthorizedAppRequest,
    @Body() body,
  ) {
    return this.service.check(id);
  }

  @Post("/:id/claim")
  async complete(
    @Param("id") id: string,
    @Req() request: AuthorizedAppRequest,
    @Body() body,
  ) {
    return this.service.claim(id);
  }
}
