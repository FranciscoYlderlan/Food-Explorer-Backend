import { FavoriteDishesRepository } from '../repositories/favoriteDishes/Repository.js';
import { FavoriteDishesService } from '../services/favoriteDishes/FavoriteDishesService.js';

export class FavoriteDishesController {
    async index(request, response) {
        const user_id = request.user.id;
        const { keyword } = request.query;

        const favoriteDishesRepository = new FavoriteDishesRepository();
        const favoriteDishesService = new FavoriteDishesService(favoriteDishesRepository);

        const dishes = await favoriteDishesService.index({ user_id, keyword });

        return response.status(200).json(dishes);
    }

    async show(request, response) {
        const { dish_id } = request.params;
        const user_id = request.user.id;

        const favoriteDishesRepository = new FavoriteDishesRepository();
        const favoriteDishesService = new FavoriteDishesService(favoriteDishesRepository);

        const dish = await favoriteDishesService.show({ user_id, dish_id });

        return response.status(200).json(dish);
    }

    async create(request, response) {
        const {} = request.body;

        return response.status(201).json({});
    }

    async update(request, response) {
        const { dish_id } = request.params;
        const user_id = request.user.id;

        const favoriteDishesRepository = new FavoriteDishesRepository();
        const favoriteDishesService = new FavoriteDishesService(favoriteDishesRepository);

        await favoriteDishesService.update({
            user_id,
            dish_id,
        });

        return response.status(200).json({});
    }

    async delete(request, response) {
        const {} = request.params;

        return response.status(202).json({});
    }
}
