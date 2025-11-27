-- CreateTable
CREATE TABLE "Calificacion" (
    "id" SERIAL NOT NULL,
    "nota" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autorId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Calificacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Calificacion" ADD CONSTRAINT "Calificacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
