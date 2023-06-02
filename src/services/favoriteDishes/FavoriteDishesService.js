export class FavoriteDishesService {
    constructor(repository) {
        this.repository = repository;
    }

    async index({ user_id, keyword }) {
        const favoriteDishes = await this.repository.findAll({ user_id, keyword });

        return favoriteDishes;
    }

    async show({ user_id, dish_id }) {
        const favoriteDish = await this.repository.findByDishIdAndUserId({ user_id, dish_id });

        return favoriteDish;
    }

    async create() {}

    async update({ user_id, dish_id }) {
        const hadAddedToFavorites = await this.repository.findByDishIdAndUserId({ user_id, dish_id });

        if (hadAddedToFavorites) {
            const { favorite_dishes_id } = hadAddedToFavorites;

            await this.repository.delete(favorite_dishes_id);
        } else {
            await this.repository.insert({ user_id, dish_id });
        }
    }

    async delete() {}
}
