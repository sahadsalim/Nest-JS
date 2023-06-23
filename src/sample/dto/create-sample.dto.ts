import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateSampleDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    readonly id:number;

    @IsString()
    @IsNotEmpty()
    readonly desc: string;
}
