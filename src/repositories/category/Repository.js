import knex from '../../database/knex/index.js';

export class CategoryRepository {
    constructor() {
        this.Categories = () => knex('category');
    }

    async findAll() {
        const categories = await this.Categories();

        return categories;
    }

    async findById(id) {
        const category = await this.Categories().where({ id });

        return category;
    }
}
