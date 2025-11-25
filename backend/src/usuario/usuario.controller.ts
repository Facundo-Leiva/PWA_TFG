// src/usuario/usuario.controller.ts
import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('perfil')
    async getPerfil(@Req() req: any) {
        const userId = req.user.id;
        return this.usuarioService.getPerfil(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id/perfil')
    async getPerfilUsuario(@Param('id') id: string) {
        return this.usuarioService.obtenerPerfilUsuario(Number(id));
    }
}
