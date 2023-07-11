
import { Player } from "src/player/entities/player.entity";
export interface TeamScore{
    player1:Player,
    player2:Player
    score:number;

}
export interface IMatch extends Document {

    readonly name: string;

    readonly id: number;
    readonly image: string;
    readonly eventId: string;
    readonly isDoubles:boolean;

    readonly team1:TeamScore;
    readonly team2:TeamScore;

}