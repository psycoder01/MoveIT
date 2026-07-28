import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationshipUserOrganization1784493093200 implements MigrationInterface {
  name = "RelationshipUserOrganization1784493093200";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD CONSTRAINT "FK_88a24953b7fb00e52d96fc1e2ba" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP CONSTRAINT "FK_88a24953b7fb00e52d96fc1e2ba"`,
    );
  }
}
