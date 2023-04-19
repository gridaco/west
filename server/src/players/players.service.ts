import { Injectable } from "@nestjs/common";
import { PrismaService } from "services";

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.player.create({ data });
  }
}
