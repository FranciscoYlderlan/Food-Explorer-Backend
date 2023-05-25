import { compare } from '../../utils/Math.js';

export class DishRepositoryInMemory {
    constructor(dishes, ingredients, categories) {
        this.Dishes = dishes;
        this.Ingredients = ingredients;
        this.Categories = categories;
    }

    async findByName(name) {
        const dish = await this.Dishes.filter(
            dish => dish.name.toLowerCase() == name.toLowerCase()
        );

        return dish;
    }

    async findById(id) {
        const [dish] = await this.Dishes.filter(dish => dish.id == id);

        return dish;
    }

    async findDishesByKeyword(keyword) {
        // inner join

        let dishes = await this.Dishes.map(dish => {
            const ingredients = this.Ingredients.filter(
                ingredient => ingredient.dish_id == dish.id
            );
            return {
                ...dish,
                ingredients,
            };
        });
        //whereLike

        dishes = await dishes.filter(dish => {
            const dishHasKeyword = dish.name.toLowerCase().includes(keyword.toLowerCase());
            const ingredientsWithKeyword = dish.ingredients.filter(ingredient =>
                ingredient.name.toLowerCase().includes(keyword.toLowerCase())
            );
            const ingredientHasKeyword = ingredientsWithKeyword.length > 0;

            return dishHasKeyword || ingredientHasKeyword;
        });

        //Order by
        dishes = dishes.sort(compare); // deixar essa função genérica

        //Group by

        let name = '';
        dishes = await dishes.filter(dish => {
            if (name != dish.name) {
                name = dish.name;
                return dish;
            }
        });

        return dishes;
    }

    async findAllDishIngredients(dish_id) {
        const ingredients = await this.Ingredients.filter(
            ingredient => ingredient.dish_id == dish_id
        );

        return ingredients;
    }

    async checkNameInUse({ name, id = null }) {
        let dish = [];

        if (id) {
            [dish] = await this.Dishes.filter(
                dish => dish.name.toLowerCase() == name.toLowerCase() && dish.id !== id
            );
        } else {
            [dish] = await this.Dishes.filter(
                dish => dish.name.toLowerCase() == name.toLowerCase()
            );
        }

        return dish;
    }

    async insertIngredientsByDish(ingredients) {
        const index = await this.Ingredients.length;

        ingredients = ingredients.map(ingredient => {
            const id = Math.floor(Math.random() * 100);
            return {
                id,
                ...ingredient,
            };
        });

        await this.Ingredients.push(...ingredients);

        // this.Ingredients = await [...this.Ingredients, ingredients];

        const insertedIngredients = await this.Ingredients.slice(index);

        return this.Ingredients;
    }

    async removeIngredientsByDish(dish_id) {
        this.Ingredients = await this.Ingredients.filter(
            ingredient => ingredient.dish_id != dish_id
        );

        return this.Ingredients;
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

        return [id];
    }

    async update({ id, name, description, picture, price, category_id, updated_at }) {
        this.Dishes = await this.Dishes.map(dish => {
            if (dish.id === id) {
                return {
                    id: dish.id,
                    name,
                    description,
                    picture,
                    price,
                    category_id,
                    updated_at,
                    created_at: dish.created_at,
                };
            }
            return dish;
        });
        const dish = this.Dishes.filter(dish => dish.id == id);

        return dish;
    }

    async delete(id) {
        this.Dishes = await this.Dishes.filter(dish => dish.id !== id);

        this.Ingredients = await this.removeIngredientsByDish(id);

        return [this.Dishes, this.Ingredients];
    }
}
