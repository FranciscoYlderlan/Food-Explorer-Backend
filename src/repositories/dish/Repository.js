import knex from '../../database/knex/index.js';

export class DishRepository {
    constructor() {
        this.Dishes = () => knex('dish');
        this.Ingredients = () => knex('ingredient');
        this.Categories = () => knex('category');
    }

    async findByName(name) {
        const dish = await this.Dishes().where({ name }).first();

        return dish;
    }

    async findById(id) {
        const dish = await this.Dishes().where({ id }).first();

        return dish;
    }

    async findAllDishes() {
        const dishes = await this.Dishes()
            .select('dish.*', 'category.name')
            .innerJoin('category', 'category_id', 'category.id');

        return dishes;
    }

    async findAllDishIngredients(dish_id) {
        const ingredients = await this.Ingredients().select('name').where({ dish_id });
        

        return ingredients;
    }

    async checkNameInUse({ name, id }) {
        const dish = await this.Dishes().where({ name }).whereNot({ id }).first();

        return dish;
    }

    async insertIngredientsByDish({ ingredients, dish_id }) {
        const insertedIngredients = await this.Ingredients().insert(ingredients).where({ dish_id });

        return insertedIngredients;
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
