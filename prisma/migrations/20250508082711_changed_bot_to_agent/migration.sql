/*
  Warnings:

  - The values [bot] on the enum `Sender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sender_new" AS ENUM ('user', 'ai_agent');
ALTER TABLE "ChatMessage" ALTER COLUMN "sender" TYPE "Sender_new" USING ("sender"::text::"Sender_new");
ALTER TYPE "Sender" RENAME TO "Sender_old";
ALTER TYPE "Sender_new" RENAME TO "Sender";
DROP TYPE "Sender_old";
COMMIT;
