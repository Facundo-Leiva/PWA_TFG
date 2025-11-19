/*
  Warnings:

  - Added the required column `id_comentario` to the `Reporte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reporte" ADD COLUMN     "id_comentario" INTEGER NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_comentario_fkey" FOREIGN KEY ("id_comentario") REFERENCES "Comentario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
