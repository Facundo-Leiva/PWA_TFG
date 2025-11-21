// src/usuario/usuario.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('perfil')
    async getPerfil(@Req() req: any) {
        const userId = req.user.id; // Viene del JWT
        return this.usuarioService.getPerfil(userId);
    }
}
