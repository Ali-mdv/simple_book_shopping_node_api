-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first" VARCHAR(40),
    "last" VARCHAR(40),
    "password" VARCHAR(128) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "phone_number" VARCHAR(16) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_staff" BOOLEAN NOT NULL DEFAULT false,
    "date_joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");
