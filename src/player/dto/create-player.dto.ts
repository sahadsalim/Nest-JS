import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePlayerDto {
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

}
