-- CreateTable
CREATE TABLE "vehicle_translations" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "bio" TEXT,
    "features" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vehicle_translations_vehicleId_idx" ON "vehicle_translations"("vehicleId");

-- CreateIndex
CREATE INDEX "vehicle_translations_locale_idx" ON "vehicle_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_translations_vehicleId_locale_key" ON "vehicle_translations"("vehicleId", "locale");

-- AddForeignKey
ALTER TABLE "vehicle_translations" ADD CONSTRAINT "vehicle_translations_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
