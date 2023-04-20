import { Injectable } from "@nestjs/common";
import { PrismaService } from "services";
import { AppCreateRequestBody } from "./apps.objects";
import * as crypto from "crypto";

@Injectable()
export class AppsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    workspace,
    data,
  }: {
    workspace: string;
    data: AppCreateRequestBody;
  }) {
    // create a new app

    const app = await this.prisma.app.create({
      data: {
        name: data.name,
        description: data.description || "",
        keys: {
          create: {
            memo: "default",
            key: make_app_key(),
            issuer: "system",
          },
        },
      },
      include: {
        keys: true,
      },
    });

    return {
      ...app,
    };
  }
}

function make_app_key(): string {
  return crypto.randomBytes(32).toString("hex");
}
