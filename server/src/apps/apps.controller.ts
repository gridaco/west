import { Body, Controller, Post, Req, Request } from "@nestjs/common";
import { AppsService } from "./apps.service";

@Controller("/apps")
export class AppsController {
  constructor(private readonly service: AppsService) {}
}
