import { AppError } from '../../utils/AppError.js';
export class OrdersService {
    constructor(repository) {
        this.repository = repository;
    }

    async index(keyword) {
        const allOrders = await this.repository.findAll(keyword);

        return allOrders;
    }

    async show({ user_id, keyword }) {
        const orders = await this.repository.findByUserId({ user_id, keyword });

        return orders;
    }

    async create({ user_id, dishes }) {
        if (dishes.length > 0) throw new AppError('É necessário adicionar itens ao seu pedido.');

        const dishesToInsert = dishes.map(dish => ({ user_id, dish_id: dish.id, qty: dish.qty }));
        const orders = await this.repository.insert(dishesToInsert);

        return orders;
    }

    async update({ user_id, new_status, created_at }) {
        const hadAddedToOrders = await this.repository.findByOrder({ user_id, created_at });
        if (hadAddedToOrders) {
            await this.repository.updateStatus({ user_id, status_id: new_status, created_at });
        } else {
            throw new AppError('Pedido não encontrado.', 404);
        }
    }

    async delete({ user_id, created_at }) {
        await this.repository.delete({ user_id, created_at });
    }
}
