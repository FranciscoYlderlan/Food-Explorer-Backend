import dayjs from '../../configs/dayjs.js';
import { AppError } from '../../utils/AppError.js';
import { DiskStorage } from '../../providers/DiskStorage.js';

export class DishService {
    constructor(repository) {
        this.repository = repository;
    }
    async index({ keyword, user_id }) {
        const dishes = await this.repository.findDishesByKeyword({ keyword, user_id });

        // const dishesWithIngredients = await Promise.all(
        //     dishes.map(async dish => {
        //         const ingredients = await this.repository.findAllDishIngredients(dish.id);
        //         return {
        //             ...dish,
        //             ingredients,
        //         };
        //     })
        // );

        const dishesByCategory = dishes.reduce((accumulator, dish) => {
            const category_id = dish.category_id;
            if (!accumulator[category_id]) {
                accumulator[category_id] = [];
            }
            accumulator[category_id].push(dish);
            return accumulator;
        }, {});

        return dishesByCategory;
    }
    async show(id) {
        const dish = await this.repository.findById(id);

        if (!dish) throw new AppError('Prato não encontrado.', 404);

        const ingredients = await this.repository.findAllDishIngredients(dish.id);

        const dishWithIngredients = { ...dish, ingredients };

        return dishWithIngredients;
    }

    async create({ name, description, picture, price, category_id, ingredients }) {
        const nameInUse = await this.repository.checkNameInUse({ name });
        const diskStorage = new DiskStorage();

        if (nameInUse) throw new AppError('Nome do prato já cadastrado.', 409);

        ingredients = JSON.parse(ingredients) ?? [];

        if (ingredients.length == 0) {
            throw new AppError('Informe os ingredientes do prato.');
        }
        if (picture) {
            await diskStorage.saveFile(picture);
        }
        // check if is string typeof myVar === 'string' || myVar instanceof String

        const updated_at = dayjs().format();
        const created_at = dayjs().format();

        const [dish_id] = await this.repository.insert({
            name,
            description,
            picture,
            price,
            category_id,
            updated_at,
            created_at,
        });

        const ingredientsInsert = ingredients.map(ingredient => {
            return {
                ...ingredient,
                dish_id,
            };
        });

        await this.repository.insertIngredientsByDish(ingredientsInsert);
        return dish_id;
    }
    async update({ id, name, description, picture, price, category_id, ingredients }) {
        const dish = await this.repository.findById(id);
        const nameInUse = await this.repository.checkNameInUse({ name, id });
        const diskStorage = new DiskStorage();

        if (nameInUse) throw new AppError('Nome do prato já cadastrado.', 409);

        const ingredientsInsert = ingredients.map(ingredient => {
            return {
                ...ingredient,
                dish_id: dish.id,
            };
        });

        dish.name = name ?? dish.name;
        dish.description = description ?? dish.description;
        dish.price = price ?? dish.price;
        dish.category_id = category_id ?? dish.category_id;

        ingredients = ingredients ?? [];

        if (ingredients.length == 0) {
            throw new AppError('Informe os ingredientes do prato.');
        }

        const hasChangedPicture = picture && dish.picture;

        if (hasChangedPicture) {
            await diskStorage.deleteFile(dish.picture);
            await diskStorage.saveFile(picture);
        } else if (picture) {
            await diskStorage.saveFile(picture);
        }

        dish.picture = picture ?? dish.picture;

        dish.updated_at = dayjs().format();

        await this.repository.update(dish);
        await this.repository.removeIngredientsByDish(dish.id);
        const ingredients_ = await this.repository.insertIngredientsByDish(ingredientsInsert);

        return ingredients_;
    }
    async delete(id) {
        const diskStorage = new DiskStorage();
        const dish = await this.repository.delete(id);

        if (dish.picture) {
            await diskStorage.deleteFile(dish.picture);
        }

        return dish;
    }
}
