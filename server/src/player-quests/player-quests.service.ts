import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { App, Prisma, Quest } from "@prisma/client";
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
    app,
    player: playerId,
    quest: questId,
  }: {
    app: App;
    player: string;
    quest: string;
  }) {
    try {
      const quest = await this.quests.get({
        id: questId,
        app: app,
      });

      const player = await this.players.get({ id: playerId, app: app });

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
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2023") {
          throw new NotFoundException();
        }
        throw new BadRequestException();
      }
      throw e;
    }
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
