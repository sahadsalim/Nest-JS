import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { TeamScore } from "../interface/match.interface";


export class CreateMatchDto {
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

    @IsString()
    @IsNotEmpty()
    readonly eventId: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly isDoubles: boolean;

    @IsOptional()
    readonly team1: TeamScore;
    @IsOptional()
    readonly team2: TeamScore;

}
