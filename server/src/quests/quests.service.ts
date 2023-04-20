import { Injectable } from "@nestjs/common";
import { PrismaService } from "services";

@Injectable()
export class QuestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.quest.create({ data });
  }

  async get(id: string, verification: { app: string }) {
    return await this.prisma.quest.findUnique({
      where: { id },
      include: {
        challenges: true,
      },
    });
  }
}
