import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

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
    readonly image: string;

    @IsOptional()
    readonly date: Date;

    @IsString()
    @IsOptional()
    readonly place: string;

    @IsOptional()
    readonly players: any[];
}