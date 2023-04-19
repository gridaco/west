import { Controller, Post, Req, Request } from "@nestjs/common";
import { GithubWebhookService } from "./github.service";

@Controller("/events/github")
export class GithubWebhookController {
  constructor(private readonly service: GithubWebhookService) {}

  @Post()
  async webhook(@Req() request: Request) {
    const event = request.headers["x-github-event"];
    const payload = request.body;

    this.service.event(event, payload);

    return "Webhook received";
  }
}
