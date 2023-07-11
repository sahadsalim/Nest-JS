import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { PlayerService } from 'src/player/player.service';

@ValidatorConstraint({ async: true })
export class PlayerIdExists implements ValidatorConstraintInterface {
    constructor(private readonly players: PlayerService) { }

    validate(id: string) {
        console.log(id);
        try{
        let x=this.players.findOne(id).then((player) => {
            return player !== undefined;
        });
        console.log("x",x);
        
        return x;
        }catch(error){
            console.log(error);
        }
    }

    defaultMessage(): string {
        return 'Player with this id does not exist';
    }
}