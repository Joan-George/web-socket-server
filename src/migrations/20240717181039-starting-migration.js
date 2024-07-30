"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		return queryInterface.sequelize.query(`
    CREATE TABLE "users" (
      "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
      "name" text,
      "password" text,
      "email" text,
      "is_active" bool,
      "created_by_id" uuid,
      "updated_by_id" uuid,
      "created_at" timestamp DEFAULT 'now()',
      "updated_at" timestamp DEFAULT 'now()'
    );

    CREATE TABLE "messages" (
      "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
      "message" text,
      "group_id" uuid,
      "sender_id" uuid,
      "is_deleted" bool,
      "created_by_id" uuid,
      "updated_by_id" uuid,
      "created_at" timestamp DEFAULT 'now()',
      "updated_at" timestamp DEFAULT 'now()',
      "deleted_at" timestamp DEFAULT 'now()'
    );

    CREATE TABLE "groups" (
      "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
      "name" text,
      "created_by_id" uuid,
      "updated_by_id" uuid,
      "created_at" timestamp DEFAULT 'now()',
      "updated_at" timestamp DEFAULT 'now()'
    );

    CREATE TABLE "user_group" (
      "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
      "user_id" uuid,
      "group_id" uuid,
      "is_deleted" uuid,
      "created_by_id" uuid,
      "updated_by_id" uuid,
      "created_at" timestamp DEFAULT 'now()',
      "updated_at" timestamp DEFAULT 'now()',
      "deleted_at" timestamp DEFAULT 'now()'
    );

    ALTER TABLE "users" ADD FOREIGN KEY ("created_by_id") REFERENCES "users" ("id");

    ALTER TABLE "users" ADD FOREIGN KEY ("updated_by_id") REFERENCES "users" ("id");

    ALTER TABLE "messages" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("id");

    ALTER TABLE "messages" ADD FOREIGN KEY ("sender_id") REFERENCES "users" ("id");

    ALTER TABLE "messages" ADD FOREIGN KEY ("created_by_id") REFERENCES "users" ("id");

    ALTER TABLE "messages" ADD FOREIGN KEY ("updated_by_id") REFERENCES "users" ("id");

    ALTER TABLE "groups" ADD FOREIGN KEY ("created_by_id") REFERENCES "users" ("id");

    ALTER TABLE "groups" ADD FOREIGN KEY ("updated_by_id") REFERENCES "users" ("id");

    ALTER TABLE "user_group" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

    ALTER TABLE "user_group" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("id");

    ALTER TABLE "user_group" ADD FOREIGN KEY ("created_by_id") REFERENCES "users" ("id");

    ALTER TABLE "user_group" ADD FOREIGN KEY ("updated_by_id") REFERENCES "users" ("id");
    `);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */

		return queryInterface.sequelize.query(`SELECT 1+2`);
	},
};
