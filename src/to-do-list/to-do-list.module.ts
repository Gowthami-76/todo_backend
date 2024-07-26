import { Module } from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { ToDoListController } from './to-do-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoListSchema } from './dto/toDo.schema';
import { UserSchema } from 'src/user/dto/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'toDoList', schema: ToDoListSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [ToDoListController],
  providers: [ToDoListService],
})
export class ToDoListModule {}
