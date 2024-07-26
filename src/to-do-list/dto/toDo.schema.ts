import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class ToDoList extends Document {
  @Prop()
  userId: string;

  @Prop()
  title: string;

  @Prop()
  desc: string;
}

export const ToDoListSchema = SchemaFactory.createForClass(ToDoList);
