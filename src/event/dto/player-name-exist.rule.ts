import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { PlayerService } from 'src/player/player.service';

@ValidatorConstraint({ async: true })
export class PlayerNameExists implements ValidatorConstraintInterface {
    constructor(private readonly players: PlayerService) { }

    validate(name: string) {
        console.log(name);
        try{
            console.log(this.players);
            
        let x=this.players.findOneByName(name).then((player) => {
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