import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { VersioningType } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.setGlobalPrefix("api");

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  const config = new DocumentBuilder()
    .setTitle("MoveIT APIs")
    .setDescription("API for MoveIT")
    .setVersion("1.0")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(5000);
}
bootstrap();
