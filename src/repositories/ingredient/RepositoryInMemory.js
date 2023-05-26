import knex from '../../database/knex/index.js';

export class IngredientRepositoryInMemory {
    constructor(ingredients) {
        this.Ingredients = ingredients;
    }

    async findAll() {
        const ingredientes = this.Ingredients;

        return ingredientes;
    }
    async findById(id) {
        const [ingredients] = this.Ingredients.filter(ingredient => ingredient.id == id);

        return ingredients;
    }
}
