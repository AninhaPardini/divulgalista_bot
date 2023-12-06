/*
  Warnings:

  - Added the required column `category_id` to the `channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link_invite` to the `channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_count` to the `channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `channels` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `channel_chat_id` on the `channels` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `chat_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "channels_channel_chat_id_key";

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "channels" ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "link_invite" TEXT NOT NULL,
ADD COLUMN     "member_count" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
DROP COLUMN "channel_chat_id",
ADD COLUMN     "channel_chat_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "chat_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "categories" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
