import { NestFactory } from '@nestjs/core';
import { BlockModule } from './block.module';

async function bootstrap() {
  const app = await NestFactory.create(BlockModule);
  await app.listen(3000);
}
bootstrap();
