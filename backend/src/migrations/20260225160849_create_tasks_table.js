/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table.enum('status', ['pending', 'in_progress', 'completed']).notNullable().defaultTo('pending');
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks');//rollback
}