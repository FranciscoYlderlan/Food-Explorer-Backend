import dayjs from 'dayjs';
import { AppError } from '../../utils/AppError.js';

export class DishService {
    constructor(repository) {
        this.repository = repository;
    }
    async index() {}
    async show() {}

    async create({ name, description, picture, price, category_id }) {
        const nameInUse = await this.repository.findByName(name);

        if (nameInUse) throw new AppError('Nome do prato já cadastrado.', 409);

        // check if is string typeof myVar === 'string' || myVar instanceof String

        const updated_at = dayjs().format();
        const created_at = dayjs().format();

        await this.repository.insert({
            name,
            description,
            picture,
            price,
            category_id,
            updated_at,
            created_at,
        });
    }

    async update({ id, name, description, picture, price, category_id }) {
        const dish = await this.repository.findById(id);

        const nameInUse = await this.repository.checkNameInUse({ name, id });

        if (nameInUse) throw new AppError('Nome do prato já cadastrado.', 409);

        // check if is string typeof myVar === 'string' || myVar instanceof String

        dish.name = name ?? dish.name;
        dish.description = description ?? dish.description;
        dish.picture = picture ?? dish.picture;
        dish.price = price ?? dish.price;
        dish.category_id = category_id ?? dish.category_id;
        dish.updated_at = dayjs().format();

        await this.repository.update(dish);
    }

    async delete(id) {
        await this.repository.delete(id);
    }
}
