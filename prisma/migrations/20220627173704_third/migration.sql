-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "first" VARCHAR(40) NOT NULL,
    "middle" VARCHAR(40),
    "last" VARCHAR(40) NOT NULL,
    "description" VARCHAR(256),

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(64) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "description" VARCHAR(256),
    "author_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "counter" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
