import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

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
}

export const EventSchema = SchemaFactory.createForClass(Event);