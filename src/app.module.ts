import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksModule } from './tasks/tasks.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb://localhost/nest-project')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
