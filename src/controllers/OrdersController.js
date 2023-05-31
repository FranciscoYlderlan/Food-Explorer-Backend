import { OrdersRepository } from '../repositories/orders/Repository.js';
import { OrdersService } from '../services/orders/OrdersService.js';

export class OrdersController {
    async index(request, response) {
        const { search } = request.query;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        const dishes = await ordersService.index(search);

        return response.status(200).json(dishes);
    }

    async show(request, response) {
        const { id: user_id } = request.params;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        const dish = await ordersService.show({ user_id, dish_id });

        return response.status(200).json(dish);
    }

    async create(request, response) {
        const { dishes } = request.body;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        const order = await ordersService.create({ user_id, dishes });

        return response.status(201).json({ order });
    }

    async update(request, response) {
        const { id } = request.params;

        return response.status(200).json({});
    }

    async delete(request, response) {
        const { id } = request.params;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        const order = await ordersService.delete({ id });

        return response.status(202).json({});
    }
}
