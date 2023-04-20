import { Module } from "@nestjs/common";
import { PlayerQuestsController } from "./player-quests.controller";
import { PlayerQuestsService } from "./player-quests.service";
import { PrismaService } from "services";
import { QuestsService } from "quests";
import { PlayerService } from "players";

@Module({
  imports: [],
  controllers: [PlayerQuestsController],
  providers: [PrismaService, QuestsService, PlayerService, PlayerQuestsService],
})
export class PlayerQuestsModule {}
