import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
} from "@nestjs/common";
import { AppsService } from "./apps.service";
import { AppCreateRequestBody } from "./apps.objects";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Applications", "Admin")
@Controller("/apps")
export class AppsController {
  constructor(private readonly service: AppsService) {}

  @Post()
  async new(@Req() request: Request, @Body() body: AppCreateRequestBody) {
    return this.service.create({
      workspace: "", // FIXME: add base auth
      data: body,
    });
  }

  @Get()
  async list(@Req() request: Request) {
    return this.service.list({
      workspace: "", // FIXME: add base auth
    });
  }

  @Get("/:id")
  async get(@Req() request: Request, @Param("id") id: string) {
    return this.service.get({
      id: id,
      workspace: "", // FIXME: add base auth
    });
  }
}
