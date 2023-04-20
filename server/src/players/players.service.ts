import { Injectable } from "@nestjs/common";
import { PrismaService } from "services";

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.player.create({ data });
  }

  async get(id: string) {
    // TODO: add verification
    return await this.prisma.player.findUnique({ where: { id } });
  }

  async quests({ player }: { player: string }) {
    return await this.prisma.playerQuest.findMany({
      where: {
        playerId: player,
      },
    });
  }
}
