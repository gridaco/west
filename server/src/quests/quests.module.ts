import { Module } from "@nestjs/common";
import { QuestsController } from "./quests.controller";
import { QuestsService } from "./quests.service";
import { PrismaService } from "services";

@Module({
  imports: [],
  controllers: [QuestsController],
  providers: [PrismaService, QuestsService],
})
export class QuestsModule {}
