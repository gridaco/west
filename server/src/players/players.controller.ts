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
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Player")
@Controller("/players")
@UseGuards(ApiKeyGuard)
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

  @Get()
  async list(@Req() request: AuthorizedAppRequest) {
    return this.service.list({
      app: request.app,
    });
  }

  @Get("/:id")
  async get(@Param("id") id: string, @Req() request: AuthorizedAppRequest) {
    return this.service.get({
      app: request.app,
      id: id,
    });
  }

  @Get("/:id/quests")
  async playerQuests(
    @Param("id") id: string,
    @Req() request: AuthorizedAppRequest,
  ) {
    return this.service.quests({
      app: request.app,
      player: id,
    });
  }
}
