import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type PlayerDocument = Document & Player;

@Schema()
export class Player {
  @Prop({ required: true })
  name: string;

  @Prop()
  id: number;

  @Prop()
  image: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);