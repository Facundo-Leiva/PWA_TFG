/*
  Warnings:

  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."usuarios";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "documento" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "id_ubicacion" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reporte" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_ubicacion" INTEGER NOT NULL,
    "id_tipoDeIncidencia" INTEGER NOT NULL,
    "id_soporteGrafico" INTEGER NOT NULL,

    CONSTRAINT "Reporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ubicacion" (
    "id" SERIAL NOT NULL,
    "latitud" INTEGER NOT NULL,
    "longitud" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "barrio" TEXT NOT NULL,

    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDeIncidencia" (
    "id" SERIAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "TipoDeIncidencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fechaEnvio" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_soporteGrafico" INTEGER NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoporteGrafico" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "archivo" TEXT NOT NULL,

    CONSTRAINT "SoporteGrafico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapaGeografico" (
    "id" SERIAL NOT NULL,
    "zoom" INTEGER NOT NULL,
    "id_ubicacion" INTEGER NOT NULL,
    "id_indiceMapa" INTEGER NOT NULL,

    CONSTRAINT "MapaGeografico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapaReporte" (
    "id" SERIAL NOT NULL,
    "id_mapaGeografico" INTEGER NOT NULL,
    "id_reporte" INTEGER NOT NULL,

    CONSTRAINT "MapaReporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndiceMapa" (
    "id" SERIAL NOT NULL,
    "ciudad" TEXT NOT NULL,
    "barrio" TEXT NOT NULL,
    "id_tipoDeIncidencia" INTEGER NOT NULL,

    CONSTRAINT "IndiceMapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndiceReporte" (
    "id" SERIAL NOT NULL,
    "id_indiceMapa" INTEGER NOT NULL,
    "id_reporte" INTEGER NOT NULL,

    CONSTRAINT "IndiceReporte_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_contrasena_key" ON "Usuario"("contrasena");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_ubicacion_fkey" FOREIGN KEY ("id_ubicacion") REFERENCES "Ubicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_ubicacion_fkey" FOREIGN KEY ("id_ubicacion") REFERENCES "Ubicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_tipoDeIncidencia_fkey" FOREIGN KEY ("id_tipoDeIncidencia") REFERENCES "TipoDeIncidencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_soporteGrafico_fkey" FOREIGN KEY ("id_soporteGrafico") REFERENCES "SoporteGrafico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_id_soporteGrafico_fkey" FOREIGN KEY ("id_soporteGrafico") REFERENCES "SoporteGrafico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapaGeografico" ADD CONSTRAINT "MapaGeografico_id_ubicacion_fkey" FOREIGN KEY ("id_ubicacion") REFERENCES "Ubicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapaGeografico" ADD CONSTRAINT "MapaGeografico_id_indiceMapa_fkey" FOREIGN KEY ("id_indiceMapa") REFERENCES "IndiceMapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapaReporte" ADD CONSTRAINT "MapaReporte_id_mapaGeografico_fkey" FOREIGN KEY ("id_mapaGeografico") REFERENCES "MapaGeografico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapaReporte" ADD CONSTRAINT "MapaReporte_id_reporte_fkey" FOREIGN KEY ("id_reporte") REFERENCES "Reporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndiceMapa" ADD CONSTRAINT "IndiceMapa_id_tipoDeIncidencia_fkey" FOREIGN KEY ("id_tipoDeIncidencia") REFERENCES "TipoDeIncidencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndiceReporte" ADD CONSTRAINT "IndiceReporte_id_indiceMapa_fkey" FOREIGN KEY ("id_indiceMapa") REFERENCES "IndiceMapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndiceReporte" ADD CONSTRAINT "IndiceReporte_id_reporte_fkey" FOREIGN KEY ("id_reporte") REFERENCES "Reporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
