/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table) {
        table.increments('post_id').primary()
        table.string('title').notNullable()
        table.text('content');
        
        // Foreign key referencing the users table
        table
          .integer('user_id')
          .notNullable()
          .references('user_id')
          .inTable('users')
          .onDelete('CASCADE')
          .index()
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.droptable('posts')
};
