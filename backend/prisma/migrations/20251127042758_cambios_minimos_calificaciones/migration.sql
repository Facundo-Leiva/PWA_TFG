/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId,autorId]` on the table `Calificacion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Calificacion_usuarioId_autorId_key" ON "Calificacion"("usuarioId", "autorId");
