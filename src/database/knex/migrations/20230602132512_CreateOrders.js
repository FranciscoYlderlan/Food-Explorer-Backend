export async function up(knex) {
    return knex.schema.createTable('orders', table => {
        table.increments('id').notNullable().primary();
        table.integer('qty').defaultTo(1);
        table.integer('status_id').defaultTo(1).references('id').inTable('status').onDelete('CASCADE');
        table.integer('dish_id').notNullable().references('id').inTable('dish').onDelete('CASCADE');
        table.integer('user_id').notNullable().references('id').inTable('user').onDelete('CASCADE');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex) {
    return knex.schema.dropTable('orders');
}
