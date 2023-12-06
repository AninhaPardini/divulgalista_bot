/*
  Warnings:

  - A unique constraint covering the columns `[channel_chat_id]` on the table `channels` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `channels` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "channels_channel_chat_id_key" ON "channels"("channel_chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "channels_user_id_key" ON "channels"("user_id");
