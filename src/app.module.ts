import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleModule } from './sample/sample.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';
import { ConfigModule } from '@nestjs/config';
import { MatchesModule } from './matches/matches.module';
import { EventModule } from './event/event.module';
@Module({
  imports: [SampleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_DB_URI),
    PlayerModule,
    MatchesModule,
    EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
}
