import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Match } from './entities/match.entity';
import { MatchSchema } from './schema/matches.schema';

@Module({
  imports:[ MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }])],
  controllers: [MatchesController],
  providers: [MatchesService]
})
export class MatchesModule {}
