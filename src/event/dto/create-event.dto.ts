import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested, isDateString } from "class-validator";
import { Player } from "src/player/schema/player.schema";

export class CreateEventDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsOptional()
    readonly id: number;

    @IsString()
    @IsOptional()
    // @IsNotEmpty()
    readonly image: string;

    // @IsDate()
    @IsOptional()
    readonly date: Date;

    @IsString()
    @IsOptional()
    readonly place: string;

    @IsOptional()
    // @ValidateNested({ each: true })
	// @Type(() => Player)
	readonly players: any[];
}