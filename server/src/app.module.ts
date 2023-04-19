import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GithubEventsModule } from "events/github";

@Module({
  imports: [GithubEventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
