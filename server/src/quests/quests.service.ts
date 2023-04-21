import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { App, Prisma } from "@prisma/client";
import { PrismaService } from "services";
import { CreateNewQuestRequestBody } from "./quests.objects";

@Injectable()
export class QuestsService {
  constructor(private readonly prisma: PrismaService) {}

  async get({ id, app }: { id: string; app: App }) {
    try {
      // fetch the quest
      const quest = await this.prisma.quest.findUnique({
        where: { id },
        include: {
          challenges: true,
        },
      });

      // validate acl - throw 404 if no access
      if (quest.appId !== app.id) {
        throw new NotFoundException();
      }

      return quest;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // not found
        if (e.code === "P2023") {
          throw new NotFoundException(`Quest ${id} not found`);
        }
      }
      throw e;
    }
  }

  async list({ app }: { app: App }) {
    return this.prisma.quest.findMany({
      where: {
        app: {
          id: app.id,
        },
      },
      include: {
        challenges: true,
      },
    });
  }

  async create({
    name,
    currency,
    memo,
    bonus,
    challenges,
    app,
  }: CreateNewQuestRequestBody & { app: App }) {
    // vlidate the challenges (check for duplicates)
    // unique by type + resource
    const duplicates = challenges?.filter(
      (challenge, index, self) =>
        self.findIndex(
          (c) => c.type === challenge.type && c.resource === challenge.resource,
        ) !== index,
    );

    if (duplicates.length) {
      throw new ConflictException(
        `Duplicate challenges: ${duplicates
          .map((d) => `{${d.type} : ${d.resource}}`)
          .join(", ")}`,
      );
    }

    return this.prisma.quest.create({
      data: {
        app: {
          connect: { id: app.id },
        },
        // required fields
        name,
        memo,
        bonus: {
          set: {
            amount: bonus?.amount || 0,
            currency: bonus?.currency || currency,
          },
        },
        challenges: {
          create: challenges?.map((challenge) => ({
            ...challenge,
            reward: {
              set: {
                ...challenge.reward,
                currency: challenge.reward?.currency || currency,
              },
            },
          })),
        },
      },
      include: {
        challenges: true,
      },
    });
  }
}
