import { Type } from "class-transformer";
import { IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Validate, ValidateNested, isDateString } from "class-validator";
import { PlayerIdExists } from "./player-id-exist.rule";
import { PlayerNameExists } from "./player-name-exist.rule";


export class EventPlayerDto {

    @IsString()
    // @Validate(PlayerIdExists)
    @Validate(PlayerNameExists)
    readonly name: string;

    @IsOptional()
    readonly id: string;
}