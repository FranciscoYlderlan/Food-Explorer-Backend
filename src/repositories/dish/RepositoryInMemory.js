export class DishRepository {
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
        const dish = await this.Dishes.filter(dish => dish.id == id);

        return dish;
    }

    async findDishesByKeyword(keyword) {
        // inner join
        let dishes = this.Dishes.map(dish => {
            const ingredients = this.Ingredients.filter(
                ingredient => ingredient.dish_id == dish.id
            );
            return {
                ...dish,
                ingredients,
            };
        });

        //whereLike
        dishes = dishes.filter(dish =>
            dish.ingredients.filter(
                ingredient =>
                    ingredient.name.indexOf(keyword) !== -1 || dish.name.indexOf(keyword) !== -1
            )
        );

        //group by

        return dishes;
    }

    async findAllDishIngredients(dish_id) {
        const ingredients = await this.Ingredients.filter(
            ingredient => ingredient.dish_id == dish_id
        );

        return ingredients;
    }

    async checkNameInUse({ name, id = null }) {
        if (id) {
            let dish = await this.Dishes.filter(
                (dish = dish.name.toLowerCase() == name.toLowerCase() && dish.id !== id)
            );
        } else {
            let dish = await this.Dishes.filter(
                dish => dish.name.toLowerCase() == name.toLowerCase()
            );
        }

        return dish;
    }

    async insertIngredientsByDish(ingredients) {
        const index = this.Ingredients.lenght;

        ingredients = ingredients.map(ingredient => {
            const id = Math.floor(Math.random() * 100);
            return {
                id,
                ...ingredient,
            };
        });

        await this.Ingredients.push(...ingredients);

        const insertedIngredients = this.Ingredients.slice(index + 1);

        return insertedIngredients;
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

        return id;
    }

    async update({ id, name, description, picture, price, category_id, updated_at }) {
        this.Dishes = await this.Dishes.map(dish => {
            if (dish.id === id) {
                return {
                    name,
                    description,
                    picture,
                    price,
                    category_id,
                    updated_at,
                };
            }
        });
        const dish = this.Dishes.filter(dish => dish.id == id);

        return dish;
    }

    async delete(id) {
        this.Dishes = await this.Dishes.filter(dish => dish.id !== id);

        this.Ingredients = await this.removeIngredientsByDish(id);

        return dish;
    }
}
