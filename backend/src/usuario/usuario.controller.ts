import { Controller, Get, UseGuards, Req, Param, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';

// Controlador de peticiones HTTP para usuarios
@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    // Controlador: obtener perfil de usuario propio
    @UseGuards(AuthGuard('jwt'))
    @Get('perfil')
    async getPerfil(@Req() req: any) {
        const userId = req.user.id;
        return this.usuarioService.getPerfil(userId);
    }

    // Controlador: obtener perfil de otro usuario
    @UseGuards(AuthGuard('jwt'))
    @Get(':id/perfil')
    async getPerfilUsuario(@Param('id') id: string) {
        return this.usuarioService.obtenerPerfilUsuario(Number(id));
    }
    // Controlador: obtener perfil de otro usuario (explorador)
    @Get(':id/perfilExp')
    async getPerfilUsuarioExp(@Param('id') id: string) {
        return this.usuarioService.obtenerPerfilUsuario(Number(id));
    }

    // Controlador: calificar usuario
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/calificar')
    async calificarUsuario (
        @Param('id') id: string,
        @Body() body: { nota: number },
        @Req() req: any
    ) {
        const usuarioId = parseInt(id, 10);
        const autorId = req.user?.id;

        if (!autorId) throw new UnauthorizedException("No se pudo identificar al autor");

        return this.usuarioService.calificarUsuario(usuarioId, body.nota, autorId);
    }
}
