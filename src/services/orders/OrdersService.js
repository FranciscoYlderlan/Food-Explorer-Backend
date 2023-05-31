import { AppError } from '../../utils/AppError.js';
export class FavoriteDishesService {
    constructor(repository) {
        this.repository = repository;
    }

    async index({ user_id }) {
        const allOrders = await this.repository.findAll({ user_id });

        return allOrders;
    }

    async show({ user_id, id }) {
        const orders = await this.repository.findById({ user_id, id });

        return orders;
    }

    async create({ user_id, dishes }) {
        if (dishes.length > 0) throw new AppError('É necessário adicionar itens ao seu pedido.');

        const dishesToInsert = dishes.map(dish => ({ user_id, dish_id: dish }));
        const orders = await this.repository.insert({ user_id, dishes: dishesToInsert });

        return orders;
    }

    async update({ user_id, id }) {
        const hadAddedToOrders = await this.repository.findById({ user_id, id });
        if (hadAddedToOrders) {
            const { id } = hadAddedToOrders;
            await this.repository.updateStatus(id, new_status);
        } else {
            throw new AppError('Pedido não encontrado.');
        }
    }

    async delete() {}
}
