import { Module } from "@nestjs/common";
import { GithubWebhookController } from "./github.controller";
import { GithubWebhookService } from "./github.service";
import { PrismaService } from "services";

@Module({
  imports: [],
  controllers: [GithubWebhookController],
  providers: [PrismaService, GithubWebhookService],
})
export class GithubEventsModule {}
