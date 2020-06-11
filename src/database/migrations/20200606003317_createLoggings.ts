/* eslint-disable func-names */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('loggings', function (table): void {
    table.string('id').primary();
    table.string('metric').notNullable();
    table.decimal('value').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('loggings');
}
