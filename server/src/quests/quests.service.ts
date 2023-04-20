import { Injectable, NotFoundException } from "@nestjs/common";
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
    challenges,
    app,
  }: CreateNewQuestRequestBody & { app: App }) {
    return this.prisma.quest.create({
      data: {
        app: {
          connect: { id: app.id },
        },
        // required fields
        name,
        currency,
        memo,
        challenges: {
          create: challenges?.map((challenge) => challenge),
        },
      },
      include: {
        challenges: true,
      },
    });
  }
}
