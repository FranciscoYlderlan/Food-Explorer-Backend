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
                'orders.user_id',
                'orders.created_at',
                'dish.id',
                'dish.name',
                'dish.category_id',
                'dish.price',
                'orders.code',
                'orders.qty',
                'orders.status_id',
                'ingredient.name as ingredient_name',
                knex.raw('(qty * price) as sale_price')
            )
            .innerJoin('ingredient', 'ingredient.dish_id', 'dish.id')
            .innerJoin('orders', 'orders.dish_id', 'dish.id')
            .innerJoin('status', 'status.id', 'orders.status_id')
            // .whereLike('ingredient_name', `%${keyword}%`)
            // .orWhereLike('dish.name', `%${keyword}%`)
            .whereLike('status.name', `%${keyword}%`)
            .groupBy(['orders.created_at', 'dish.name'])
            .orderBy('orders.created_at', 'desc');
        // .toSQL();
        // console.log(dishes);
        return dishes;
    }
    async findByUserId({ user_id, keyword }) {
        const dish = await this.Dishes()
            .select(
                'orders.user_id',
                'orders.created_at',
                'dish.id',
                'dish.name',
                'dish.category_id',
                'dish.price',
                'orders.code',
                'orders.qty',
                'orders.status_id',
                'ingredient.name as ingredient_name',
                knex.raw('(qty * price) as sale_price')
            )
            .innerJoin('ingredient', 'ingredient.dish_id', 'dish.id')
            .innerJoin('orders', 'orders.dish_id', 'dish.id')
            .innerJoin('status', 'status.id', 'orders.status_id')
            .where({ 'orders.user_id': user_id })
            .where(function () {
                // this.whereLike('ingredient_name', `%${keyword}%`);
                // this.orWhereLike('dish.name', `%${keyword}%`);
                this.whereLike('status.name', `%${keyword}%`);
            })
            .groupBy(['orders.created_at', 'dish.name'])
            .orderBy('orders.created_at', 'desc');

        return dish;
    }

    async findByOrder({ user_id, created_at }) {
        const dish = await this.Orders().where({ user_id, created_at }).first();

        return dish;
    }

    async updateStatus({ user_id, status_id, updated_at, created_at }) {
        const dish = await this.Orders().update({ status_id, updated_at }).where({ user_id, created_at });

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
