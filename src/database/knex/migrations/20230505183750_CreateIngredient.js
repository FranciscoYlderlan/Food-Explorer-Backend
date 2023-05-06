
export async function up(knex) {
    return knex.schema.createTable("ingredient", table => {
        table.increments('id').notNullable().primary();
        table.text('name').notNullable();
        table.text('picture').nullable();
        table.decimal('amount').nullable();
        table.integer('dish_id').notNullable().references('id').inTable('dish').onDelete("CASCADE");
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
    })
};

export async function down(knex) {
  return knex.schema.dropTable("ingredient");
};