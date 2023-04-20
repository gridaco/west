import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "services";
import { AuthorizedAppRequest } from "./api-key-request";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private prisma: PrismaService) {} // Add this constructor

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthorizedAppRequest>();
    const apiKey = request.headers["authorization"]?.split(" ")[1];

    if (!apiKey) {
      return false;
    }

    // Look up the API key in the AppKey model
    const appKey = await this.prisma.appKey.findUnique({
      where: { key: apiKey },
      include: {
        app: true,
      },
    });

    const isValid =
      appKey &&
      !appKey.revokedAt &&
      (!appKey.expiresAt || appKey.expiresAt > new Date());

    // Add the user information to the request object if the API key is valid
    if (isValid) {
      request.app = appKey.app;
    }

    return isValid;
  }
}
