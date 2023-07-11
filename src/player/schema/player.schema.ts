import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { Event } from 'src/event/entities/event.entity';

// export type PlayerDocument = HydratedDocument<Player>;
export type PlayerDocument = Document & Player;

@Schema()
export class Player {
  @Prop({ required: true })
  name: string;

  @Prop()
  id: number;

  @Prop()
  image: string;
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Event.name }] })
  // events: Event[];
}

export const PlayerSchema = SchemaFactory.createForClass(Player);