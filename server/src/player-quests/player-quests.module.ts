import { Module } from "@nestjs/common";
import { PlayerQuestsController } from "./player-quests.controller";
import { PlayerQuestsService } from "./player-quests.service";
import { PrismaService } from "services";

@Module({
  imports: [],
  controllers: [PlayerQuestsController],
  providers: [PrismaService, PlayerQuestsService],
})
export class PlayerQuestsModule {}
