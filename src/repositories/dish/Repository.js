import knex from '../../database/knex/index.js';

export class DishRepository {
    constructor() {
        this.Dishes = () => knex('dish');
        this.Ingredients = () => knex('ingredient');
        this.Categories = () => knex('category');
    }

    async findById(id) {
        const dish = await this.Dishes().where({ id }).first();

        return dish;
    }

    async findDishesByKeyword(keyword) {
        const dishes = await this.Dishes()
            .select('dish.*', 'ingredient.name as ingredient_name')
            .innerJoin('ingredient', 'dish_id', 'dish.id')
            .whereLike('ingredient_name', `%${keyword}%`)
            .orWhereLike('dish.name', `%${keyword}%`)
            .groupBy('dish.id');

        return dishes;
    }

    async findAllDishIngredients(dish_id) {
        const ingredients = await this.Ingredients().where({ dish_id });

        return ingredients;
    }

    async checkNameInUse({ name, id = null }) {
        if (id) {
            const dish = await this.Dishes().whereLike('name', name).whereNot({ id }).first();
        } else {
            const dish = await this.Dishes().whereLike('name', name).first();
        }

        return dish;
    }

    async insertIngredientsByDish(ingredients) {
        const insertedIngredients = await this.Ingredients().insert(ingredients);

        return insertedIngredients;
    }

    async removeIngredientsByDish(dish_id) {
        const removedIngredients = await this.Ingredients().where({ dish_id }).del();

        return removedIngredients;
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
