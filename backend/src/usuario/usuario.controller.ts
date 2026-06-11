import { Controller, Get, UseGuards, Req, Param, Post, Body, UnauthorizedException, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';
import { CalificarUsuarioDto } from './dto/calificar-usuario.dto';

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
    async getPerfilUsuario(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.obtenerPerfilUsuario(id);
    }
    // Controlador: obtener perfil de otro usuario (explorador)
    @Get(':id/perfilExp')
    async getPerfilUsuarioExp(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.obtenerPerfilUsuario(id);
    }

    // Controlador: calificar usuario
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/calificar')
    async calificarUsuario (
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CalificarUsuarioDto,
        @Req() req: any
    ) {
        const autorId = req.user?.id;

        if (!autorId) throw new UnauthorizedException("No se pudo identificar al autor");

        return this.usuarioService.calificarUsuario(id, body.nota, autorId);
    }
}
