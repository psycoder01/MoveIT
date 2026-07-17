import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationshipOrganizationUser1784154418273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "organizations",
      new TableForeignKey({
        name: "FK_organizations_created_by_users",
        columnNames: ["created_by"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "organizations",
      "FK_organizations_created_by_users",
    );
  }
}
