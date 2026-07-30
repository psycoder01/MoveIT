import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationshipInvitationsNotificationsUsers1785452887474 implements MigrationInterface {
  name = "RelationshipInvitationsNotificationsUsers1785452887474";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invitations" ADD CONSTRAINT "FK_fecdffec754fa4d5cea98709776" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" ADD CONSTRAINT "FK_2afdbc73ee1fe16cf1f3929e920" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notifications" DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" DROP CONSTRAINT "FK_2afdbc73ee1fe16cf1f3929e920"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" DROP CONSTRAINT "FK_fecdffec754fa4d5cea98709776"`,
    );
  }
}
