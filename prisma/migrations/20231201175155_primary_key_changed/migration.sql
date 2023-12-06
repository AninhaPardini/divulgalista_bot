/*
  Warnings:

  - The primary key for the `channels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `chat_id` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "channels_channel_chat_id_key";

-- DropIndex
DROP INDEX "users_chat_id_key";

-- AlterTable
ALTER TABLE "channels" DROP CONSTRAINT "channels_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "channels_pkey" PRIMARY KEY ("channel_chat_id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "chat_id",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "users_id_seq";
