import { Event } from "src/event/entities/event.entity";

export interface IPlayer extends Document {

    readonly name: string;

    readonly id: number;
    readonly image: string;
    // readonly events:Event;
}