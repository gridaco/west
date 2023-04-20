import { Body, Controller, Post, Req, Request } from "@nestjs/common";
import { HooksService } from "./hooks.service";

@Controller("/hooks")
export class HooksController {
  constructor(private readonly service: HooksService) {}
}
