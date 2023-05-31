export class FavoriteDishesService {
    constructor(repository) {
        this.repository = repository;
    }

    async index({ user_id, keyword }) {
        const favoriteDishes = await this.repository.findAll({ user_id, keyword });

        return favoriteDishes;
    }

    async show({ user_id, dish_id }) {
        const favoriteDishe = await this.repository.findByDishIdAndUserId({ user_id, dish_id });

        return favoriteDishe;
    }

    async create() {}

    async update({ user_id, dish_id }) {
        const hadAddedToFavorites = await this.repository.findByDishIdAndUserId({ user_id, dish_id });
        if (hadAddedToFavorites) {
            const { id } = hadAddedToFavorites;
            await this.repository.delete(id);
        } else {
            await this.respository.insert({ user_id, dish_id });
        }
    }

    async delete() {}
}
