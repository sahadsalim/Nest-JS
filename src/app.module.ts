import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleModule } from './sample/sample.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [SampleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_DB_URI),
    PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
}
