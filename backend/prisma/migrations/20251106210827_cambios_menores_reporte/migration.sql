/*
  Warnings:

  - Added the required column `titulo` to the `Reporte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reporte" ADD COLUMN     "titulo" TEXT NOT NULL,
ALTER COLUMN "fechaCreacion" SET DEFAULT CURRENT_TIMESTAMP;
