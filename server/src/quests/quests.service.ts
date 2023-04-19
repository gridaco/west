import { Injectable } from "@nestjs/common";
import { PrismaService } from "services";

@Injectable()
export class QuestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.quest.create({ data });
  }
}
