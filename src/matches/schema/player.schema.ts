import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreatePlayerDto } from 'src/player/dto/create-player.dto';

export type MatchDocument = HydratedDocument<Match>;

@Schema()
export class Match {
  @Prop({ required: true})
  name: string;

  @Prop()
  id: number;

  @Prop()
  image: string;


}

export const MatchSchema = SchemaFactory.createForClass(Match);