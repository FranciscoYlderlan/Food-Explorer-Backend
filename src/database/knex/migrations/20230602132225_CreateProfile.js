export async function up(knex) {
    return knex.schema
        .createTable('profile', table => {
            table.increments('id').notNullable().primary();
            table.text('name').notNullable();
            table.text('description').nullable();
        })
        .then(() => {
            return knex('profile').insert([{ name: 'Administrador' }, { name: 'Usuário' }]);
        });
}

export async function down(knex) {
    return knex.schema.dropTable('profile');
}
