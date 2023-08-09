import { IsOptional, IsString, Validate } from "class-validator";
import { PlayerNameExists } from "./player-name-exist.rule";


export class EventPlayerDto {

    @IsString()
    @Validate(PlayerNameExists)
    readonly name: string;

    @IsOptional()
    readonly id: string;
}