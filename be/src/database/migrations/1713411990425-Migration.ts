import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713411990425 implements MigrationInterface {
    name = 'Migration1713411990425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\` DROP FOREIGN KEY \`FK_6870df9060d5556a210be8157dd\``);
        await queryRunner.query(`ALTER TABLE \`chat_room\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`chat\` DROP COLUMN \`body\``);
        await queryRunner.query(`ALTER TABLE \`chat\` DROP COLUMN \`room\``);
        await queryRunner.query(`ALTER TABLE \`chat\` DROP COLUMN \`userUsernumber\``);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD \`roomId\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD \`roomname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD \`message\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD \`roomId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD CONSTRAINT \`FK_52af74c7484586ef4bdfd8e4dbb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`usernumber\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD CONSTRAINT \`FK_873f1938e2afb7758cf302a58af\` FOREIGN KEY (\`roomId\`) REFERENCES \`chat_room\`(\`roomId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\` DROP FOREIGN KEY \`FK_873f1938e2afb7758cf302a58af\``);
        await queryRunner.query(`ALTER TABLE \`chat\` DROP FOREIGN KEY \`FK_52af74c7484586ef4bdfd8e4dbb\``);
        await queryRunner.query(`ALTER TABLE \`chat\` DROP COLUMN \`roomId\``);
        await queryRunner.query(`ALTER TABLE \`chat\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`chat\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP COLUMN \`roomname\``);
        await queryRunner.query(`ALTER TABLE \`chat_room\` DROP COLUMN \`roomId\``);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD \`userUsernumber\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD \`room\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD \`body\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`chat_room\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`chat\` ADD CONSTRAINT \`FK_6870df9060d5556a210be8157dd\` FOREIGN KEY (\`userUsernumber\`) REFERENCES \`user\`(\`usernumber\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
