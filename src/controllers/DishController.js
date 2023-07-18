import { DishRepository } from '../repositories/dish/Repository.js';
import { DishService } from '../services/dish/DishService.js';

export class DishController {
    async index(request, response) {
        const { keyword } = request.query;
        const user_id = request.user.id;

        const dishRepository = new DishRepository();
        const dishService = new DishService(dishRepository);

        const dishes = await dishService.index({ keyword, user_id });

        return response.status(200).json(dishes);
    }

    async show(request, response) {
        const { id } = request.params;

        const dishRepository = new DishRepository();
        const dishService = new DishService(dishRepository);

        const dish = await dishService.show(id);

        return response.status(200).json(dish);
    }

    async create(request, response) {
        let { name, description, price, category_id, ingredients } = request.body;

        let { picture } = request.body;
        let filename = picture;

        if (request.file) filename = request.file.filename;

        const dishRepository = new DishRepository();
        const dishService = new DishService(dishRepository);

        picture = filename ?? picture;
        picture = picture === 'undefined' ? null : picture;

        await dishService.create({
            name,
            description,
            picture,
            price,
            category_id,
            ingredients,
        });

        return response.status(201).json({});
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, description, price, category_id, ingredients } = request.body;
        let { picture } = request.body;
        let filename = picture;

        if (request.file) filename = request.file.filename;

        const dishRepository = new DishRepository();
        const dishService = new DishService(dishRepository);

        picture = filename ?? picture;
        picture = picture === 'undefined' ? null : picture;

        await dishService.update({
            id,
            name,
            description,
            picture,
            price,
            category_id,
            ingredients,
        });

        return response.status(200).json({});
    }

    async delete(request, response) {
        const { id } = request.params;

        const dishRepository = new DishRepository();
        const dishService = new DishService(dishRepository);

        await dishService.delete(id);

        return response.status(202).json({});
    }
}
