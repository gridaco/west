import { Module } from "@nestjs/common";
import { PlayerController } from "./players.controller";
import { PlayerService } from "./players.service";
import { PrismaService } from "services";

@Module({
  imports: [],
  controllers: [PlayerController],
  providers: [PrismaService, PlayerService],
})
export class PlayerModule {}
