import knex from '../../database/knex/index.js';

export class UserRepository {
    constructor() {
        this.Dishes = () => knex('dish');
    }

    async findByName(name) {
        const dish = await this.Dishes().where({ name }).first();

        return dish;
    }

    async findById(id) {
        const dish = await this.Dishes().where({ id }).first();

        return dish;
    }

    async checkNameInUse({ name, id }) {
        const dish = await this.Dishes().where({ name }).whereNot({ id }).first();

        return dish;
    }

    async insert({ name, description, picture, price, category_id, updated_at, created_at }) {
        const dish = await this.Dishes().insert({
            name,
            description,
            picture,
            price,
            category_id,
            updated_at,
            created_at,
        });

        return dish;
    }

    async update({ id, name, description, picture, price, category_id, updated_at }) {
        const dish = await this.Dishes()
            .update({
                name,
                description,
                picture,
                price,
                category_id,
                updated_at,
            })
            .where({ id });

        return dish;
    }

    async delete(id) {
        const dish = await this.Dishes().where({ id }).del();

        return dish;
    }
}
