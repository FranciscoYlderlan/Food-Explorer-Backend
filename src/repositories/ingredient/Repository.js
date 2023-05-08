import knex from '../../database/knex/index.js';

export class IngredientRepository {
    constructor() {
        this.Ingredients = () => knex('ingredient');
    }
}
