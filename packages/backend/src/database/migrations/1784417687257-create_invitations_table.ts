import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvitationsTable1784417687257 implements MigrationInterface {
  name = "CreateInvitationsTable1784417687257";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."invitations_status_enum" AS ENUM('pending', 'accepted', 'declined', 'expired')`,
    );
    await queryRunner.query(
      `CREATE TABLE "invitations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."invitations_status_enum" NOT NULL DEFAULT 'pending', "organization_id" uuid NOT NULL, "user_id" uuid NOT NULL, "created_by" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5dec98cfdfd562e4ad3648bbb07" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invitations"`);
    await queryRunner.query(`DROP TYPE "public"."invitations_status_enum"`);
  }
}
