import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserRepository, UserSchema } from '@app/common';

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
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
