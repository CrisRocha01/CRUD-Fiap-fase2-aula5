import { MigrationInterface, QueryRunner } from "typeorm";

export class default1728177834457 implements MigrationInterface {
    name = 'default1728177834457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "register" RENAME COLUMN "leave_out" TO "clock_out"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "register" RENAME COLUMN "clock_out" TO "leave_out"`);
    }

}
