import { AppError } from '../../utils/AppError.js';
import dayjs from '../../configs/dayjs.js';

export class OrdersService {
    constructor(repository) {
        this.repository = repository;
    }

    async index(keyword) {
        const allOrders = await this.repository.findAll(keyword);

        const result = [];
        const seen = new Set();

        let details = '';
        let total_price = 0;

        for (const obj of allOrders) {
            const { code, user_id, created_at, status_id, name, qty, sale_price } = obj;

            const key = `${user_id}-${created_at}`;

            if (!seen.has(key)) {
                result.push({ code, user_id, status_id, created_at, details, total_price });
                seen.add(key);
            }

            const index = result.findIndex(
                item => item.user_id === user_id && item.created_at === created_at
            );

            result[index].details += `${qty} x ${name}, `;
            result[index].total_price += sale_price;

            //result[index].details.push({ qty, name });
        }

        return result;
    }

    async show({ user_id, keyword }) {
        const orders = await this.repository.findByUserId({ user_id, keyword });

        const result = [];
        const seen = new Set();

        let details = '';
        let total_price = 0;

        for (const obj of orders) {
            const { code, user_id, created_at, status_id, name, qty, sale_price } = obj;

            const key = `${user_id}-${created_at}`;

            if (!seen.has(key)) {
                result.push({ code, user_id, status_id, created_at, details, total_price });
                seen.add(key);
            }

            const index = result.findIndex(
                item => item.user_id === user_id && item.created_at === created_at
            );

            result[index].details += `${qty} x ${name}, `;
            result[index].total_price += sale_price;

            //result[index].details.push({ qty, name });
        }

        return result;
    }

    async create({ user_id, dishes }) {
        if (dishes.length <= 0) throw new AppError('É necessário adicionar itens ao seu pedido.');

        const updated_at = dayjs().format();
        const created_at = dayjs().format();

        // dishes = JSON.parse(dishes);

        const data = new Date(created_at);
        const timestamp = Math.floor(data.getTime() / 1000);

        const code = `${timestamp}${user_id}`;

        const dishesToInsert = dishes.map(dish => ({
            user_id: Number(user_id),
            code,
            dish_id: dish.id,
            qty: dish.qty,
            updated_at,
            created_at,
        }));
        await this.repository.insert(dishesToInsert);

        return dishesToInsert;
    }

    async update({ user_id, new_status, created_at }) {
        const hadAddedToOrders = await this.repository.findByOrder({ user_id, created_at });
        if (hadAddedToOrders) {
            const updated_at = dayjs().format();
            await this.repository.updateStatus({ user_id, status_id: new_status, updated_at, created_at });
        } else {
            throw new AppError('Pedido não encontrado.', 404);
        }
    }

    async delete({ user_id, created_at }) {
        await this.repository.delete({ user_id, created_at });
    }
}
