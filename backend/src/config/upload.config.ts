import { BadRequestException } from '@nestjs/common';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
]);

// Obtener la carpeta de archivos en forma absoluta.
// En desarrollo utiliza backend/uploads y en Railway puede configurarse
// como /app/uploads mediante la variable UPLOAD_DIR.
export function getUploadDirectory(): string {
    const configuredDirectory = process.env.UPLOAD_DIR?.trim() || './uploads';
    return resolve(process.cwd(), configuredDirectory);
}

// Crear la carpeta si todavía no existe.
export function ensureUploadDirectory(): string {
    const uploadDirectory = getUploadDirectory();
    mkdirSync(uploadDirectory, { recursive: true });
    return uploadDirectory;
}

// Configuración compartida por todos los endpoints que reciben imágenes.
export function createImageUploadOptions() {
    return {
        storage: diskStorage({
            destination: (_req, _file, callback) => {
                callback(null, ensureUploadDirectory());
            },
            filename: (_req, file, callback) => {
                const extension = extname(file.originalname).toLowerCase();
                const uniqueName = `file-${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
                callback(null, uniqueName);
            },
        }),
        limits: {
            fileSize: MAX_IMAGE_SIZE_BYTES,
        },
        fileFilter: (_req, file, callback) => {
            if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
                callback(
                    new BadRequestException(
                        'Formato de imagen no permitido. Utiliza JPG, PNG, WEBP o GIF.',
                    ),
                    false,
                );
                return;
            }

            callback(null, true);
        },
    };
}
