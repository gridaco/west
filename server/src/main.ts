import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ServerModule } from "./server.module";
import { PrismaService } from "./services";

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);

  const config = new DocumentBuilder()
    .setTitle("WEST API")
    .setDescription("The WEST API description")
    .setVersion("0")
    .addTag("west")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
