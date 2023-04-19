import { Injectable } from "@nestjs/common";
import { PrismaService } from "services";

@Injectable()
export class PlayerQuestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.playerQuest.create({ data });
  }
}
