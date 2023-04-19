import { Controller, Post, Req, Request } from "@nestjs/common";
import { GithubWebhookService } from "./github.service";
import { ApiExcludeController } from "@nestjs/swagger";

@Controller("/events/github")
@ApiExcludeController() // internal use for listening to github webhooks
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
