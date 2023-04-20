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
import {
  StartNewPlayerQuestRequestBody,
  TooManyPlayerQuestResponseData,
} from "./player-quests.objects";
import { ApiKeyGuard, AuthorizedAppRequest } from "api-key";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags("Player Quests")
@Controller("/players/quests")
@UseGuards(ApiKeyGuard)
export class PlayerQuestsController {
  constructor(private readonly service: PlayerQuestsService) {}

  @Post("/start")
  @ApiBody({
    type: StartNewPlayerQuestRequestBody,
  })
  @ApiResponse({
    description: "Player quest created and started",
    status: 201,
  })
  @ApiResponse({
    description: "Player already has a quest of this type >= conccurency",
    type: TooManyPlayerQuestResponseData,
    status: 409,
  })
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
