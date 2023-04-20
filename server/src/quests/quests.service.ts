import { Injectable, NotFoundException } from "@nestjs/common";
import { App, Prisma } from "@prisma/client";
import { PrismaService } from "services";

@Injectable()
export class QuestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.quest.create({ data });
  }

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
}
