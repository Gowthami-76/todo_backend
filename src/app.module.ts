import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ToDoListModule } from './to-do-list/to-do-list.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), UserModule, ToDoListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
