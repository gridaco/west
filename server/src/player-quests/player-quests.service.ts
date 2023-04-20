import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { App, Prisma, Quest } from "@prisma/client";
import { PlayerService } from "players";
import { QuestsService } from "quests";
import { PrismaService } from "services";
import { TooManyPlayerQuestResponseData } from "./player-quests.objects";

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

      const { conccurency } = quest;

      const qs = await this.prisma.playerQuest.findMany({
        where: {
          questId: quest.id,
          player: {
            id: player.id,
          },
        },
        include: {
          _count: true,
        },
      });

      if (conccurency && qs.length >= conccurency) {
        // if n is not falsy, validate.
        // if n in falsy, it means that the quest has no conccurency limit
        throw new TooManyPlayerQuestResponseData(
          player.id,
          quest.id,
          qs.length,
          conccurency,
          qs.map((q) => q.id),
        );
      }

      return this.prisma.playerQuest.create({
        data: {
          player: {
            connect: { id: player.id },
          },
          quest: {
            connect: { id: quest.id },
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
