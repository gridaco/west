import { Body, Controller, Post, Req, Request } from "@nestjs/common";
import { QuestsService } from "./quests.service";

@Controller("/quests")
export class QuestsController {
  constructor(private readonly service: QuestsService) {}

  @Post()
  async new(@Req() request: Request, @Body() body) {
    //
  }
}
