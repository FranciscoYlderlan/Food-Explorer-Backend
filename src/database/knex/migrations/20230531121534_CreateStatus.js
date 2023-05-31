export async function up(knex) {
    return knex.schema
        .createTable('status', table => {
            table.increments('id').notNullable().primary();
            table.text('name').nullable();
        })
        .then(() => {
            return knex('status').insert([
                { name: 'Pendente' },
                { name: 'Preparando' },
                { name: 'Entregue' },
            ]);
        });
}

export async function down(knex) {
    return knex.schema.dropTable('status');
}
