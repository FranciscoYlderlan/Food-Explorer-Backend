import knex from '../../database/knex/index.js';

export class FavoriteDishesRepository {
    constructor() {
        this.Users = () => knex('user');
        this.Dishes = () => knex('dish');
        this.Categories = () => knex('category');
        this.FavoriteDishes = () => knex('favorite_dishes');
    }
    async findAll({ user_id, keyword }) {
        const dishes = await this.Dishes()
            .select('dish.*', 'ingredient.name as ingredient_name')
            .innerJoin('ingredient', 'ingredient.dish_id', 'dish.id')
            .innerJoin('favorite_dishes', 'favorite_dishes.dish_id', 'dish.id')
            .where({ 'favorite_dishes.user_id': user_id })
            .where(function () {
                this.whereLike('ingredient_name', `%${keyword}%`);
                this.orWhereLike('dish.name', `%${keyword}%`);
            })
            .groupBy('dish.id');

        return dishes;
    }
    async findByDishIdAndUserId({ user_id, dish_id, keyword = '' }) {
        const dish = await this.Dishes()
            .select(
                'favorite_dishes.id as favorite_dishes_id',
                'dish.*',
                'ingredient.name as ingredient_name'
            )
            .innerJoin('ingredient', 'ingredient.dish_id', 'dish.id')
            .innerJoin('favorite_dishes', 'favorite_dishes.dish_id', 'dish.id')
            .where({ 'favorite_dishes.user_id': user_id, 'favorite_dishes.dish_id': dish_id })
            .where(function () {
                this.whereLike('ingredient_name', `%${keyword}%`);
                this.orWhereLike('dish.name', `%${keyword}%`);
            })
            .first();
        return dish;
    }

    async insert({ dish_id, user_id }) {
        const dish = await this.FavoriteDishes().insert({
            user_id,
            dish_id,
        });

        return dish;
    }

    async delete(id) {
        const dish = await this.FavoriteDishes().where({ id }).del();

        return dish;
    }
}
