import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { CreatePlayerDto } from "src/player/dto/create-player.dto";


export class CreateMatchDto {
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


}
