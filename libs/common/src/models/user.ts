import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ collection: 'users' })
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  username: string;

  @Prop({ type: Date, required: true })
  birthdate: Date;

  @Prop({ type: [mongoose.Types.ObjectId] })
  blockedUsers?: Array<mongoose.Types.ObjectId>;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
