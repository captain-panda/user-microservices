import { User, UserRepository, UserSchema } from '@app/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';

@Module({
  imports: [
    User,
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: User.name,
      },
    ]),
  ],
  controllers: [BlockController],
  providers: [BlockService, UserRepository],
})
export class BlockModule {}
