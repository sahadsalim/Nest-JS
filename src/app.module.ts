import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleModule } from './sample/sample.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [SampleModule,MongooseModule.forRoot('mongodb+srv://sahads9745:Test%40123@cluster0.cuxiqsz.mongodb.net/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
