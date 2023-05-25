import knex from '../../database/knex/index.js';

export class IngredientRepositoryInMemory {
    constructor() {
        this.Ingredients = () => knex('ingredient');
        this.Dishes = () => knex('dish');
    }

    async showAll() {
        const ingredientes = this.Ingredients;

        return ingredientes;
    }
    async findById(id) {
        const ingredients = this.Ingredients.filter(ingredient => ingredient.id == id);

        return ingredients;
    }
}
