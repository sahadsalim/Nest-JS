import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop({ required: true})
  name: string;

  @Prop()
  id: number;

  @Prop()
  image: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);