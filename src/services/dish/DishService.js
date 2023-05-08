import dayjs from 'dayjs';
import { AppError } from '../../utils/AppError.js';
import * as utils from '../../utils/Provider.js';

export class DishService {
    constructor(repository) {
        this.repository = repository;
    }
    async index() {
        const dishes = await this.repository.findAllDishes();

        return dishes;
    }
    async show() {}

    async create({ name, description, picture, price, category_id, ingredients }) {
        const nameInUse = await this.repository.findByName(name);

        if (nameInUse) throw new AppError('Nome do prato já cadastrado.', 409);

        ingredients = ingredients ?? [];

        if (ingredients.lenght == 0) {
            throw new AppError('Informe os ingredientes do prato.');
        }

        // check if is string typeof myVar === 'string' || myVar instanceof String

        const updated_at = dayjs().format();
        const created_at = dayjs().format();

        const [id] = await this.repository.insert({
            name,
            description,
            picture,
            price,
            category_id,
            updated_at,
            created_at,
        });

        await this.repository.insertIngredientsDish({ ingredients, dish_id: id });
    }

    async update({ id, name, description, picture, price, category_id, ingredients }) {
        const dish = await this.repository.findById(id);

        const nameInUse = await this.repository.checkNameInUse({ name, id });

        if (nameInUse) throw new AppError('Nome do prato já cadastrado.', 409);

        // check if is string typeof myVar === 'string' || myVar instanceof String

        dish.name = name ?? dish.name;
        dish.description = description ?? dish.description;
        dish.picture = picture ?? dish.picture;
        dish.price = price ?? dish.price;
        dish.category_id = category_id ?? dish.category_id;

        const insertedIngredients = await this.repository.findAllDishIngredients(dish.id);

        const formattedIngredients = insertedIngredients.map((ingredient) => {
            return ingredient.name;
        });

        const equalsIngredients = utils.isArrayEquals(formattedIngredients, ingredients);

        if (!equalsIngredients) {
            await this.repository.insertIngredientsDish(ingredients, dish.id);
        }

        dish.updated_at = dayjs().format();

        await this.repository.update(dish);
    }

    async delete(id) {
        await this.repository.delete(id);
    }
}
