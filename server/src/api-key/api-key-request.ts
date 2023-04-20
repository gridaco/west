import { Request } from "@nestjs/common";
import type { App } from "@prisma/client";

export interface AuthorizedAppRequest extends Request {
  app: App;
}
