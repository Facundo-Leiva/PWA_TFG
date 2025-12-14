import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';

// DTO para la creación de un reporte
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
    location: string;
}
