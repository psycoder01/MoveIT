import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrganizationTable1781382629144 implements MigrationInterface {
    name = 'CreateOrganizationTable1781382629144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."organization_plan_enum" AS ENUM('free', 'basic', 'pro', 'enterprise')`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "logo_url" character varying, "plan" "public"."organization_plan_enum" NOT NULL DEFAULT 'free', "is_active" boolean NOT NULL DEFAULT true, "created_by" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a08804baa7c5d5427067c49a31f" UNIQUE ("slug"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TYPE "public"."organization_plan_enum"`);
    }

}
