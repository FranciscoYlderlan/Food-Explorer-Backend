import knex from '../../database/knex/index.js';

export class OrdersRepository {
    constructor() {
        this.Users = () => knex('user');
        this.Dishes = () => knex('dish');
        this.Categories = () => knex('category');
        this.Orders = () => knex('orders');
    }
    async findAll(keyword) {
        const dishes = await this.Dishes()
            .select(
                'dish.*',
                'orders.user_id',
                'orders.created_at',
                'ingredient.name as ingredient_name',
                knex.raw('(qty * price) as sale_price')
            )
            .innerJoin('ingredient', 'ingredient.dish_id', 'dish.id')
            .innerJoin('orders', 'orders.dish_id', 'dish.id')
            .whereLike('ingredient_name', `%${keyword}%`)
            .orWhereLike('dish.name', `%${keyword}%`)
            .groupBy(['orders.created_at', 'dish.name']);

        return dishes;
    }
    async findByUserId({ user_id, keyword }) {
        const dish = await this.Dishes()
            .select(knex.raw('dish.*, ingredient.name as ingredient_name, sum(qty * price) as SalePrice'))
            .innerJoin('ingredient', 'dish_id', 'dish.id')
            .innerJoin('orders', 'dish_id', 'dish.id')
            .where({ 'orders.user_id': user_id })
            .where(function () {
                this.whereLike('ingredient_name', `%${keyword}%`);
                this.orWhereLike('dish.name', `%${keyword}%`);
            })
            .groupBy('orders.created_at, orders.dish_id');

        return dish;
    }

    async findByOrder({ user_id, created_at }) {
        const dish = await this.Orders().where({ user_id, created_at }).first();

        return dish;
    }

    async updateStatus({ user_id, status_id, updated_at, created_at }) {
        const dish = await this.Orders().insert({ status_id, updated_at }).where({ user_id, created_at });

        return dish;
    }

    async insert(dishes) {
        await this.Orders().insert(dishes);
    }

    async delete({ user_id, created_at }) {
        const dish = await this.FavoriteDishes().where(user_id, created_at).del();

        return dish;
    }
}
