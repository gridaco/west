import { Body, Controller, Post, Req, Request } from "@nestjs/common";
import { PlayerService } from "./players.service";

@Controller("/events/github")
export class PlayerController {
  constructor(private readonly service: PlayerService) {}

  @Post()
  async new(@Req() request: Request, @Body() body) {
    this.service.create(body);
  }
}
