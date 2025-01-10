import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // é possível adicionar um pipe de validação global, tornando desnecessário adicionar os pipes repetidamente em todos os endpoints
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true
  // }))
  await app.listen(process.env.PORT ?? 3000);
  console.log(`server is running in the port ${process.env.PORT ?? 3000}`);
}
bootstrap();
