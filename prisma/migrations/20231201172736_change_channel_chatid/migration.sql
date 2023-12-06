/*
  Warnings:

  - A unique constraint covering the columns `[chat_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_chat_id_key" ON "users"("chat_id");
