import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaType, SchemaTypes } from 'mongoose';
import { Player } from 'src/player/schema/player.schema';

// export type EventDocument = HydratedDocument<Event>;
export type EventDocument = Document & Event;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop()
  id: number;

  @Prop()
  image: string;
  @Prop()
  date: Date;
  @Prop()
  place: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Player.name }])
  players:any;
}

export const EventSchema = SchemaFactory.createForClass(Event);