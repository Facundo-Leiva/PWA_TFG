import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateReporteDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    category: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    location: string;
}
