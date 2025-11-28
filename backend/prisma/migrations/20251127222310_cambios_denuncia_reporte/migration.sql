/*
  Warnings:

  - You are about to drop the `Denuncia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Denuncia" DROP CONSTRAINT "Denuncia_id_denunciado_fkey";

-- DropForeignKey
ALTER TABLE "Denuncia" DROP CONSTRAINT "Denuncia_id_denunciante_fkey";

-- DropTable
DROP TABLE "Denuncia";

-- CreateTable
CREATE TABLE "DenunciaReporte" (
    "id" SERIAL NOT NULL,
    "motivo" TEXT NOT NULL,
    "detalle" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_autor" INTEGER NOT NULL,
    "id_reporte" INTEGER NOT NULL,

    CONSTRAINT "DenunciaReporte_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DenunciaReporte" ADD CONSTRAINT "DenunciaReporte_id_autor_fkey" FOREIGN KEY ("id_autor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DenunciaReporte" ADD CONSTRAINT "DenunciaReporte_id_reporte_fkey" FOREIGN KEY ("id_reporte") REFERENCES "Reporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
