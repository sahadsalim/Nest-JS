import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { PlayerService } from 'src/player/player.service';

@ValidatorConstraint({ async: true })
export class PlayerIdExists implements ValidatorConstraintInterface {
    constructor(private readonly players: PlayerService) { }

    async validate(id: string) {
        try {
            let x = await this.players.findOne(id).then((player) => {
                return player !== undefined;
            });
            return x;
        } catch (error) {
            console.log(error);
        }
    }

    defaultMessage(): string {
        return 'Player with this id does not exist';
    }
}