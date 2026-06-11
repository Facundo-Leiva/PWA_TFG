-- La contraseña no debe tener una restricción de unicidad.
-- Cada hash se utiliza únicamente para verificar las credenciales de su usuario.
DROP INDEX IF EXISTS "Usuario_password_key";
