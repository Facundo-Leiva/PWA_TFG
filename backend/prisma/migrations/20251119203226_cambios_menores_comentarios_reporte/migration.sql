/*
  Warnings:

  - You are about to drop the column `id_comentario` on the `Reporte` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reporte" DROP CONSTRAINT "Reporte_id_comentario_fkey";

-- AlterTable
ALTER TABLE "Reporte" DROP COLUMN "id_comentario";

-- CreateTable
CREATE TABLE "_ComentarioToReporte" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ComentarioToReporte_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ComentarioToReporte_B_index" ON "_ComentarioToReporte"("B");

-- AddForeignKey
ALTER TABLE "_ComentarioToReporte" ADD CONSTRAINT "_ComentarioToReporte_A_fkey" FOREIGN KEY ("A") REFERENCES "Comentario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComentarioToReporte" ADD CONSTRAINT "_ComentarioToReporte_B_fkey" FOREIGN KEY ("B") REFERENCES "Reporte"("id") ON DELETE CASCADE ON UPDATE CASCADE;
