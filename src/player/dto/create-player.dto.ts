import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { Event } from "src/event/entities/event.entity";

export class CreatePlayerDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsOptional()
    readonly id:number;

    @IsString()
    @IsOptional()
    // @IsNotEmpty()
    readonly image: string;

    // @IsOptional()
    // @ValidateNested({ each: true })
	// @Type(() => Event)
    // readonly events: Event[];
}
