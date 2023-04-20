import { Module } from "@nestjs/common";
import { PrismaService } from "services";
import { GithubEventsModule } from "events/github";
import { AppsModule } from "apps";
import { PlayerQuestsModule } from "player-quests";
import { PlayerModule } from "players";
import { QuestsModule } from "quests";
import { HooksModule } from "hooks";

@Module({
  imports: [
    AppsModule,
    HooksModule,
    QuestsModule,
    PlayerModule,
    PlayerQuestsModule,
    GithubEventsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class ServerModule {}
