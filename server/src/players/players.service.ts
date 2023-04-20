import { Injectable, NotFoundException } from "@nestjs/common";
import { App, Prisma } from "@prisma/client";
import { PrismaService } from "services";
import { CreateNewPlayerRequestBody } from "./players.objects";

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    app,
    identifier,
    description,
    username,
    email,
    metadata,
  }: {
    app: App;
  } & CreateNewPlayerRequestBody) {
    return this.prisma.player.create({
      data: {
        app: {
          connect: { id: app.id },
        },
        identifier,
        description,
        username,
        email,
        metadata,
      },
    });
  }

  async get({ app, id }: { app: App; id: string }) {
    try {
      // fetch the player
      const player = await this.prisma.player.findUnique({ where: { id } });

      // validate acl - throw 404 if no access
      if (player.appId !== app.id) {
        throw new NotFoundException();
      }

      return player;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // not found
        if (e.code === "P2023") {
          throw new NotFoundException();
        }
      }
      throw e;
    }
  }

  async quests({ player }: { player: string }) {
    return await this.prisma.playerQuest.findMany({
      where: {
        playerId: player,
      },
    });
  }
}
