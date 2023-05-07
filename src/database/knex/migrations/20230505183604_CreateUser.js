export async function up(knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments('id').notNullable().primary();
        table.text('name').notNullable();
        table.text('password').notNullable();
        table.text('email').notNullable();
        table.text('avatar').nullable();
        table.integer('profile_id').notNullable().references('id').inTable('profile');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex) {
    return knex.schema.dropTable('user');
}
