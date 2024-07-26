import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true, default: uuid })
  emailAddress: string;

  @Prop()
  mobileNumber: string;

  // @Prop({
  //   enum: ['super-admin', 'admin', 'employee'],
  // })
  // role: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
