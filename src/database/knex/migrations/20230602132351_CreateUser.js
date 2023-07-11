export async function up(knex) {
    return knex.schema
        .createTable('user', table => {
            table.increments('id').notNullable().primary();
            table.text('name').notNullable();
            table.text('password').notNullable();
            table.text('email').notNullable();
            table.text('avatar').nullable();
            table.integer('profile_id').defaultTo(2).notNullable().references('id').inTable('profile');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .then(() => {
            return knex('user').insert({
                name: 'admin',
                password: process.env.ADMIN_PASSWORD,
                email: 'admin@email.com',
                avatar: null,
                profile_id: 1,
            });
        });
}
export async function down(knex) {
    return knex.schema.dropTable('user');
}
