-- DropIndex
DROP INDEX "channels_user_id_key";

-- AlterTable
CREATE SEQUENCE channels_id_seq;
ALTER TABLE "channels" ALTER COLUMN "id" SET DEFAULT nextval('channels_id_seq');
ALTER SEQUENCE channels_id_seq OWNED BY "channels"."id";
