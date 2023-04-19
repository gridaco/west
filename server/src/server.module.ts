import { Module } from "@nestjs/common";
import { AppsModule } from "apps";
import { GithubEventsModule } from "events/github";
import { PlayerModule } from "players";

@Module({
  imports: [AppsModule, PlayerModule, GithubEventsModule],
  controllers: [],
  providers: [],
})
export class ServerModule {}
