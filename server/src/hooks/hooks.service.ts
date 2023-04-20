import { Injectable } from "@nestjs/common";
import { PrismaService } from "services";

@Injectable()
export class HooksService {
  constructor(private readonly prisma: PrismaService) {}
}
