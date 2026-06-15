import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrganizationsTable1781567009387 implements MigrationInterface {
  name = "CreateOrganizationsTable1781567009387";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."organizations_plan_enum" AS ENUM('free', 'basic', 'pro', 'enterprise')`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "logo_url" character varying, "plan" "public"."organizations_plan_enum" NOT NULL DEFAULT 'free', "is_active" boolean NOT NULL DEFAULT true, "created_by" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_963693341bd612aa01ddf3a4b68" UNIQUE ("slug"), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(`DROP TYPE "public"."organizations_plan_enum"`);
  }
}
