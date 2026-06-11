// Configurar variables de entorno
export default () => {
    const port = parseInt(process.env.PORT || '3000', 10);
    const defaultCorsOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ];

    const corsOrigins = (
        process.env.CORS_ORIGINS || defaultCorsOrigins.join(',')
    )
        .split(',')
        .map((origin) => origin.trim().replace(/\/+$/, ''))
        .filter(Boolean);

    return {
        port,
        jwtSecret: process.env.JWT_SECRET as string,
        publicApiUrl: (
            process.env.PUBLIC_API_URL || `http://localhost:${port}`
        ).replace(/\/+$/, ''),
        uploadDir: process.env.UPLOAD_DIR || './uploads',
        corsOrigins,
    };
};
