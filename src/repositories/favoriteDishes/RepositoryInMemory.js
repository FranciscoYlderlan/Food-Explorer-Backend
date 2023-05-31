import { compare } from '../../utils/Math.js';

export class FavoriteDishesRepositoryInMemory {
    constructor(dishes, ingredients, categories) {
        this.Dishes = dishes;
        this.Ingredients = ingredients;
        this.Categories = categories;
    }

    async findByName(name) {
        const dish = await this.Dishes.filter(dish => dish.name.toLowerCase() == name.toLowerCase());

        return dish;
    }

    async findById(id) {
        const [dish] = await this.Dishes.filter(dish => dish.id == id);

        return dish;
    }

    async insert({ name, description, picture, price, category_id, updated_at, created_at }) {
        const id = Math.floor(Math.random() * 100);
        await this.Dishes.push({
            id,
            name,
            description,
            picture,
            price,
            category_id,
            updated_at,
            created_at,
        });

        return this.Dishes;
    }

    async delete(id) {
        this.Dishes = await this.Dishes.filter(dish => dish.id !== id);

        this.Ingredients = await this.removeIngredientsByDish(id);

        return [this.Dishes, this.Ingredients];
    }
}
