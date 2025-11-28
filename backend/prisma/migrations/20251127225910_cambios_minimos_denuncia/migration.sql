/*
  Warnings:

  - A unique constraint covering the columns `[id_autor,id_reporte]` on the table `DenunciaReporte` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DenunciaReporte_id_autor_id_reporte_key" ON "DenunciaReporte"("id_autor", "id_reporte");
