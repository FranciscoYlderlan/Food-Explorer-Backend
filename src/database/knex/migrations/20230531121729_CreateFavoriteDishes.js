export async function up(knex) {
    return knex.schema.createTable('favorite_dishes', table => {
        table.increments('id').notNullable().primary();
        table.integer('dish_id').notNullable().references('id').inTable('dish').onDelete('CASCADE');
        table.integer('user_id').notNullable().references('id').inTable('user').onDelete('CASCADE');
    });
}

export async function down(knex) {
    return knex.schema.dropTable('favorite_dishes');
}
