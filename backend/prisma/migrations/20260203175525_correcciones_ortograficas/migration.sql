/*
  Warnings:

  - You are about to drop the `IndiceMapa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IndiceReporte` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IndiceMapa" DROP CONSTRAINT "IndiceMapa_id_tipoDeIncidencia_fkey";

-- DropForeignKey
ALTER TABLE "IndiceReporte" DROP CONSTRAINT "IndiceReporte_id_indiceMapa_fkey";

-- DropForeignKey
ALTER TABLE "IndiceReporte" DROP CONSTRAINT "IndiceReporte_id_reporte_fkey";

-- DropForeignKey
ALTER TABLE "MapaGeografico" DROP CONSTRAINT "MapaGeografico_id_indiceMapa_fkey";

-- DropTable
DROP TABLE "IndiceMapa";

-- DropTable
DROP TABLE "IndiceReporte";

-- CreateTable
CREATE TABLE "FiltroMapa" (
    "id" SERIAL NOT NULL,
    "ciudad" TEXT NOT NULL,
    "barrio" TEXT NOT NULL,
    "id_tipoDeIncidencia" INTEGER NOT NULL,

    CONSTRAINT "FiltroMapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FiltroReporte" (
    "id" SERIAL NOT NULL,
    "id_indiceMapa" INTEGER NOT NULL,
    "id_reporte" INTEGER NOT NULL,

    CONSTRAINT "FiltroReporte_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MapaGeografico" ADD CONSTRAINT "MapaGeografico_id_indiceMapa_fkey" FOREIGN KEY ("id_indiceMapa") REFERENCES "FiltroMapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiltroMapa" ADD CONSTRAINT "FiltroMapa_id_tipoDeIncidencia_fkey" FOREIGN KEY ("id_tipoDeIncidencia") REFERENCES "TipoDeIncidencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiltroReporte" ADD CONSTRAINT "FiltroReporte_id_indiceMapa_fkey" FOREIGN KEY ("id_indiceMapa") REFERENCES "FiltroMapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiltroReporte" ADD CONSTRAINT "FiltroReporte_id_reporte_fkey" FOREIGN KEY ("id_reporte") REFERENCES "Reporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
