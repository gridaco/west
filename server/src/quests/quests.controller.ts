import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { QuestsService } from "./quests.service";
import { ApiKeyGuard, AuthorizedAppRequest } from "api-key";
import { CreateNewQuestRequestBody } from "./quests.objects";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Quests")
@Controller("/quests")
@UseGuards(ApiKeyGuard)
export class QuestsController {
  constructor(private readonly service: QuestsService) {}

  @ApiResponse({
    status: 201,
  })
  @ApiResponse({
    status: 409,
  })
  @Post()
  async new(
    @Req() request: AuthorizedAppRequest,
    @Body() body: CreateNewQuestRequestBody,
  ) {
    return await this.service.create({
      app: request.app,
      ...body,
    });
  }

  @Get()
  async list(@Req() request: AuthorizedAppRequest) {
    return await this.service.list({
      app: request.app,
    });
  }

  @Get("/:id")
  async get(@Param("id") id: string, @Req() request: AuthorizedAppRequest) {
    return await this.service.get({
      app: request.app,
      id: id,
    });
  }
}
