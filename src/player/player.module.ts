import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Player } from './entities/player.entity';
import { PlayerSchema } from './schema/player.schema';

@Module({
  imports:[ MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
