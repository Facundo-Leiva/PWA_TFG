
// Configurar variables de entorno
export default () => {
    const port = parseInt(process.env.PORT || '3000', 10);

    return {
        port,
        jwtSecret: process.env.JWT_SECRET as string,
        publicApiUrl: (process.env.PUBLIC_API_URL || `http://localhost:${port}`).replace(/\/+$/, ''),
    };
};