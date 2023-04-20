import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { QuestsService } from "./quests.service";
import { ApiKeyGuard, AuthorizedAppRequest } from "api-key";
import { CreateNewQuestRequestBody } from "./quests.objects";

@Controller("/quests")
@UseGuards(ApiKeyGuard)
export class QuestsController {
  constructor(private readonly service: QuestsService) {}

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
}
