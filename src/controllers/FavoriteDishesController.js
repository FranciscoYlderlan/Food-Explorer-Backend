import { FavoriteDishesRepository } from '../repositories/favoriteDishes/Repository.js';
import { FavoriteDishesService } from '../services/favoriteDishes/FavoriteDishesService.js';

export class FavoriteDishesController {
    async index(request, response) {
        const { search } = request.query;

        const favoriteDishesRepository = new FavoriteDishesRepository();
        const favoriteDishesService = new FavoriteDishesService(favoriteDishesRepository);

        const dishes = await favoriteDishesService.index(search);

        return response.status(200).json(dishes);
    }

    async show(request, response) {
        const { id: user_id } = request.params;

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
        const { id } = request.params;

        const favoriteDishesRepository = new FavoriteDishesRepository();
        const favoriteDishesService = new FavoriteDishesService(favoriteDishesRepository);

        await favoriteDishesService.update({
            user_id,
            dish_id: id,
        });

        return response.status(200).json({});
    }

    async delete(request, response) {
        const {} = request.params;

        return response.status(202).json({});
    }
}
