
export async function up(knex) {
    return knex.schema.createTable("profile", table => {    
        table.increments('id').notNullable().primary();
        table.text('name').notNullable();    
    })
};

export async function down(knex) {
    return knex.schema.dropTable("profile");
};
