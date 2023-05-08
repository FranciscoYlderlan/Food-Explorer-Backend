import knex from '../../database/knex/index.js';

export class IngredientRepository {
    constructor() {
        this.Ingredients = () => knex('ingredient');
    }

    async findAll() {
        const ingredients = await this.Ingredients();

        return ingredients;
    }

    async findById(id) {
        const ingredient = await this.Ingredients().where({ id });

        return ingredient;
    }
}
