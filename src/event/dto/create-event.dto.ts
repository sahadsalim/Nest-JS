import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, isDateString } from "class-validator";

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
}