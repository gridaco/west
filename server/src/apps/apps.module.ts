import { Module } from "@nestjs/common";
import { AppsController } from "./apps.controller";
import { AppsService } from "./apps.service";
import { PrismaService } from "services";

@Module({
  imports: [],
  controllers: [AppsController],
  providers: [PrismaService, AppsService],
})
export class AppsModule {}
