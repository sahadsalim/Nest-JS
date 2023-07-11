import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TeamScore } from '../interface/match.interface';
import { Player } from 'src/player/entities/player.entity';

export type MatchDocument = HydratedDocument<Match>;

@Schema()
export class Match {

  @Prop({ required: true })
  name: string;

  @Prop()
  id: number;

  @Prop()
  image: string;


  @Prop()
  eventId: string;

  @Prop()
  isDoubles: boolean;

  @Prop(raw({
    player1: {
      name: String
    },
    player2: {
      name: String
    },
    score: Number

  }))
  team1: TeamScore;

  @Prop(raw({
    player1: {
      name: String
    },
    player2: {
      name: String
    },
    score: Number

  }))
  team2: TeamScore;

}

export const MatchSchema = SchemaFactory.createForClass(Match);