import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { BlockModule } from './block/block.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.USER_DB_CONNECTION!),
    UserModule,
    BlockModule,
    AuthModule,
  ],
})
export class AppModule {}
