import { NestFactory } from "@nestjs/core";
import { ServerModule } from "./server.module";
import { PrismaService } from "./services";

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
