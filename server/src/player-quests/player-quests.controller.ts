import { Body, Controller, Post, Req, Request } from "@nestjs/common";
import { PlayerQuestsService } from "./player-quests.service";

@Controller("/players/quests")
export class PlayerQuestsController {
  constructor(private readonly service: PlayerQuestsService) {}

  @Post()
  async new(@Req() request: Request, @Body() body) {
    //
  }
}
