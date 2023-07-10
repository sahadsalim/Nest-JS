import { CreatePlayerDto } from "src/player/dto/create-player.dto";

export interface IMatch extends Document {

    readonly name: string;

    readonly id: number;
    readonly image: string;
}