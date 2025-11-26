/*
  Warnings:

  - You are about to drop the `_ComentarioToReporte` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_reporte` to the `Comentario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ComentarioToReporte" DROP CONSTRAINT "_ComentarioToReporte_A_fkey";

-- DropForeignKey
ALTER TABLE "_ComentarioToReporte" DROP CONSTRAINT "_ComentarioToReporte_B_fkey";

-- AlterTable
ALTER TABLE "Comentario" ADD COLUMN     "id_reporte" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ComentarioToReporte";

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_id_reporte_fkey" FOREIGN KEY ("id_reporte") REFERENCES "Reporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
