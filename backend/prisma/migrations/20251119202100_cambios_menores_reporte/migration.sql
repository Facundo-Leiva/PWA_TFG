-- DropForeignKey
ALTER TABLE "public"."Reporte" DROP CONSTRAINT "Reporte_id_comentario_fkey";

-- AlterTable
ALTER TABLE "Reporte" ALTER COLUMN "id_comentario" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_comentario_fkey" FOREIGN KEY ("id_comentario") REFERENCES "Comentario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
