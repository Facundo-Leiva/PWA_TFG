import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// Controlador de peticiones HTTP para la autenticación del usuario
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // Controlador: registro de usuario
    @Post('register')
    async register(@Body() data: RegisterDto) {
        return this.authService.register(data);
    }

    // Controlador: inicio de sesión del usuario
    @Post('login')
    async login(@Body() data: LoginDto) {
        return this.authService.login(data);
    }
}