-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_id_soporteGrafico_fkey";

-- AlterTable
ALTER TABLE "Comentario" ALTER COLUMN "id_soporteGrafico" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_id_soporteGrafico_fkey" FOREIGN KEY ("id_soporteGrafico") REFERENCES "SoporteGrafico"("id") ON DELETE SET NULL ON UPDATE CASCADE;
