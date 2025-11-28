-- CreateTable
CREATE TABLE "Denuncia" (
    "id" SERIAL NOT NULL,
    "motivo" TEXT NOT NULL,
    "detalle" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_denunciado" INTEGER NOT NULL,
    "id_denunciante" INTEGER NOT NULL,

    CONSTRAINT "Denuncia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Denuncia" ADD CONSTRAINT "Denuncia_id_denunciado_fkey" FOREIGN KEY ("id_denunciado") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denuncia" ADD CONSTRAINT "Denuncia_id_denunciante_fkey" FOREIGN KEY ("id_denunciante") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
