import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["debug"],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });
  app.use(helmet());
  // app.enableCors();
  app.enableShutdownHooks();
  app.use(session({
    name: "js-backend-sessionid",
    secret: "ThisIaASuperSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60000,
    }
  }));

  const config = new DocumentBuilder()
    .setTitle("Some API")
    .setDescription("Some API description")
    .setVersion("1.0")
    .addBasicAuth()
    .addBearerAuth()
    .addApiKey({ name: "X-Olala-Key", type: "apiKey" })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
