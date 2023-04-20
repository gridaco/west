import { Body, Controller, Post, Req, Request } from "@nestjs/common";
import { HooksService } from "./hooks.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Hooks", "Admin")
@Controller("/hooks")
export class HooksController {
  constructor(private readonly service: HooksService) {}
}
