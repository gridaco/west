import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
} from "@nestjs/common";
import { PlayerQuestsService } from "./player-quests.service";
import { StartNewPlayerQuestRequestBody } from "./player-quests.objects";

@Controller("/players/quests")
export class PlayerQuestsController {
  constructor(private readonly service: PlayerQuestsService) {}

  @Post("/start")
  async new(
    @Req() request: Request,
    @Body() body: StartNewPlayerQuestRequestBody,
  ) {
    return this.service.create(body);
  }

  @Get("/:id")
  async get(@Param("id") id: string, @Req() request: Request, @Body() body) {
    return this.service.get(id);
  }

  @Get("/:id/check")
  async check(@Param("id") id: string, @Req() request: Request, @Body() body) {
    return this.service.check(id);
  }

  @Post("/:id/claim")
  async complete(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() body,
  ) {
    return this.service.claim(id);
  }
}
