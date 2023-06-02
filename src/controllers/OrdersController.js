import { OrdersRepository } from '../repositories/orders/Repository.js';
import { OrdersService } from '../services/orders/OrdersService.js';

export class OrdersController {
    async index(request, response) {
        const { keyword } = request.query;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        const dishes = await ordersService.index(keyword);

        return response.status(200).json(dishes);
    }

    async show(request, response) {
        const { id: user_id } = request.params;
        const { keyword } = request.query;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        const dish = await ordersService.show({ user_id, keyword });

        return response.status(200).json(dish);
    }

    async create(request, response) {
        const { dishes } = request.body;
        //array de dish_id e qtd
        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        const order = await ordersService.create({ user_id, dishes });

        return response.status(201).json({ order });
    }

    async update(request, response) {
        const { user_id, new_status, created_at } = request.body;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        await ordersService.update({ user_id, new_status, created_at });

        return response.status(200).json({});
    }

    async delete(request, response) {
        const { id } = request.params;
        const { user_id, created_at } = request.body;

        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository);

        await ordersService.delete({ user_id, created_at });

        return response.status(202).json({});
    }
}
