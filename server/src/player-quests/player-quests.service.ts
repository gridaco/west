import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { App, Challenge, Prisma, Quest } from "@prisma/client";
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
            create: quest.challenges
              .filter((c) => !c.archived)
              .map((challenge) => ({
                challenge: {
                  connect: { id: challenge.id },
                },
              })),
          },
        },
        include: {
          challenges: true,
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

  async check({ id, app }: { id: string; app: App }) {
    const quest = await this.prisma.playerQuest.findUnique({
      where: {
        id,
      },
      include: {
        challenges: {
          include: {
            challenge: true,
          },
        },
      },
    });

    // check acl (this will throw if the app is not allowed to access the player)
    const player = await this.players.get({ id: quest.playerId, app: app });

    // check if the quest is completed
    const { challenges } = quest;

    // check with master's condition
    const checks = await Promise.all(
      challenges.map(({ challenge }) => check_challenge({ challenge })),
    );

    const completions = checks.filter((c) => c.completed);

    // update the quest as checked
    const updated_challenges = this.prisma.playerQuestChallenge.updateMany({
      where: {
        id: { in: completions.map((c) => c.id) },
      },
      data: {
        verified: true,
      },
    });

    // return the result
    return {
      total: challenges.length,
      completed: completions.length,
      ...{ ...quest, challenges: updated_challenges },
    };
  }

  async claim(id: string) {
    //
    throw new Error("Not implemented");
  }
}

async function check_challenge({
  challenge,
}: {
  challenge: Challenge;
}): Promise<Challenge & { completed: boolean }> {
  const { type } = challenge;

  switch (type) {
    case "GITHUB_STAR":
      throw new Error("Not implemented");
    case "CUSTOM":
      throw new Error("Not implemented");
    default:
      throw new BadRequestException();
  }
  //
}
