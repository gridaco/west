import { Injectable } from "@nestjs/common";
import { PrismaService } from "services";

@Injectable()
export class AppsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.app.create({ data });
  }
}
