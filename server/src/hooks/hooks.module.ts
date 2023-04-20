import { Module } from "@nestjs/common";
import { PrismaService } from "services";
import { HooksController } from "./hooks.controller";
import { HooksService } from "./hooks.service";

@Module({
  imports: [],
  controllers: [HooksController],
  providers: [PrismaService, HooksService],
})
export class HooksModule {}
