import { Type } from "class-transformer";
import { IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Validate, ValidateNested, isDateString } from "class-validator";
import { PlayerIdExists } from "./player-id-exist";
import { PlayerNameExists } from "./player-name-exist";


export class EventPlayerDto {

    @IsString()
    // @Validate(PlayerIdExists)
    @Validate(PlayerNameExists)
    name: string;
}