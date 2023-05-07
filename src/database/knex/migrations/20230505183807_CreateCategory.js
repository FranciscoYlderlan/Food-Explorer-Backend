export async function up(knex) {
    return knex.schema
        .createTable('category', (table) => {
            table.increments('id').notNullable().primary();
            table.text('name').notNullable();
            table.text('description').nullable();
        })
        .then(() => {
            return knex('category').insert([
                { name: 'Refeição' },
                { name: 'Bebida' },
                { name: 'Sobremesa' },
            ]);
        });
}

export async function down(knex) {
    return knex.schema.dropTable('category');
}
