import { Injectable } from "@nestjs/common";
import { PrismaService } from "services";
import { AppCreateRequestBody } from "./apps.objects";

@Injectable()
export class AppsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    workspace,
    data,
  }: {
    workspace: string;
    data: AppCreateRequestBody;
  }) {
    return await this.prisma.app.create({ data });
  }
}
