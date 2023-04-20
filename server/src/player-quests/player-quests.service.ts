import { Injectable } from "@nestjs/common";
import { PlayerService } from "players";
import { QuestsService } from "quests";
import { PrismaService } from "services";

@Injectable()
export class PlayerQuestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly players: PlayerService,
    private readonly quests: QuestsService,
  ) {}

  async get(id: string) {
    return this.prisma.playerQuest.findUnique({
      where: {
        id,
      },
    });
  }

  async create({
    player: playerId,
    quest: questId,
  }: {
    player: string;
    quest: string;
  }) {
    const quest = await this.quests.get(questId, {
      app: "", // FIXME:
    });

    const player = await this.players.get(playerId);

    return this.prisma.playerQuest.create({
      data: {
        player: {
          connect: player,
        },
        quest: {
          connect: quest,
        },
        challenges: {
          create: quest.challenges.map((challenge) => ({
            challenge: {
              connect: challenge,
            },
          })),
        },
      },
    });
  }

  async check(id: string) {
    //
    throw new Error("Not implemented");
  }

  async claim(id: string) {
    //
    throw new Error("Not implemented");
  }
}
