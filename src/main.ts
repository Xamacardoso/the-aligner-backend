import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    // Descomentar a linha abaixo para habilitar o cors so pro front
    // {
    //   origin: process.env.FRONTEND_URL,
    //   credentials: true,
    // }
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
