/*
  Warnings:

  - The primary key for the `channels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `channel_chat_id` on the `channels` table. All the data in the column will be lost.
  - Added the required column `id` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "channels" DROP CONSTRAINT "channels_pkey",
DROP COLUMN "channel_chat_id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "channels_pkey" PRIMARY KEY ("id");
