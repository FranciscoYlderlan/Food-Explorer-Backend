export async function up(knex) {
    return knex.schema.createTable('dish', (table) => {
        table.increments('id').notNullable().primary();
        table.text('name').notNullable();
        table.text('description').notNullable();
        table.text('picture').nullable();
        table.float('price').notNullable();
        table.integer('category_id').notNullable().references('id').inTable('category');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex) {
    return knex.schema.dropTable('dish');
}
