import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ServerModule } from "./server.module";
import { PrismaService } from "./services";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);

  // initialize prisma
  await _prisma(app);

  // initialize swagger
  _swagger(app);

  // enable validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

async function _prisma(app) {
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}

function _swagger(app) {
  const config = new DocumentBuilder()
    .setTitle("WEST API")
    .setDescription("The WEST API description")
    .setVersion("0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);
}

bootstrap();
