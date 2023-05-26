import { DishRepositoryInMemory } from '../../repositories/dish/RepositoryInMemory.js';
import { DishService } from '../dish/DishService.js';

describe('DishService', () => {
    it('should show all items based on keyword', async () => {
        const Dishes = [
            {
                id: 1,
                name: 'Bobo de camarão',
                description:
                    'Bobó de camarão é um prato da culinária afro-brasileira. De consistência cremosa, é feito com camarões refogados em temperos verdes e leite de coco.',
                picture: '',
                price: 40.0,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
            {
                id: 2,
                name: 'Parmigiana',
                description:
                    'Bife à parmegiana ou filé à parmegiana, um prato brasileiro, é um tipo de bife frito, composto por um pedaço de carne fatiado, empanado com farinha de trigo e ovos (clara de ovo), coberto com queijo do tipo parmesão e bastante molho de tomate e condimentos como orégano a gosto.',
                picture: '',
                price: 45.0,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
            {
                id: 3,
                name: 'Carreteiro',
                description:
                    'É feito de arroz ao qual se adiciona carne bovina bem picada e refogada, carne-seca ou carne de sol desfiada ou picada, às vezes paio, bacon e linguiça em pedaços, refogados em bastante gordura, com alho, cebola, tomate e cheiro-verde, sempre com bastante tempero.',
                picture: '',
                price: 20,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
        ];

        const Ingredients = [
            { id: 1, name: 'Camarão', amount: '300g', dish_id: 1 },
            { id: 2, name: 'Tempero', amount: '1mg', dish_id: 1 },
            { id: 3, name: 'Arroz', amount: '60g', dish_id: 2 },
            { id: 4, name: 'Bife', amount: '100g', dish_id: 2 },
            { id: 5, name: 'Arroz', amount: '60g', dish_id: 3 },
            { id: 6, name: 'Picadinho de carne', amount: '100g', dish_id: 3 },
        ];

        const Categories = [
            {
                id: 1,
                name: 'Refeição',
                description: null,
            },
            {
                id: 2,
                name: 'Bebida',
                description: null,
            },
            {
                id: 3,
                name: 'Sobremesa',
                description: null,
            },
        ];

        const expected = [
            {
                id: 3,
                name: 'Carreteiro',
                description:
                    'É feito de arroz ao qual se adiciona carne bovina bem picada e refogada, carne-seca ou carne de sol desfiada ou picada, às vezes paio, bacon e linguiça em pedaços, refogados em bastante gordura, com alho, cebola, tomate e cheiro-verde, sempre com bastante tempero.',
                picture: '',
                price: 20,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
                ingredients: [
                    { id: 5, name: 'Arroz', amount: '60g', dish_id: 3 },
                    { id: 6, name: 'Picadinho de carne', amount: '100g', dish_id: 3 },
                ],
            },
            {
                id: 2,
                name: 'Parmigiana',
                description:
                    'Bife à parmegiana ou filé à parmegiana, um prato brasileiro, é um tipo de bife frito, composto por um pedaço de carne fatiado, empanado com farinha de trigo e ovos (clara de ovo), coberto com queijo do tipo parmesão e bastante molho de tomate e condimentos como orégano a gosto.',
                picture: '',
                price: 45,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
                ingredients: [
                    { id: 3, name: 'Arroz', amount: '60g', dish_id: 2 },
                    { id: 4, name: 'Bife', amount: '100g', dish_id: 2 },
                ],
            },
        ];

        const keyword = 'arroz';

        const dishRepositoryInMemory = new DishRepositoryInMemory(Dishes, Ingredients, Categories);
        const dishService = new DishService(dishRepositoryInMemory);

        const result = await dishService.index(keyword);

        expect(result).toEqual(expected);
    });
    it('should show specific item', async () => {
        const Dishes = [
            {
                id: 1,
                name: 'Bobo de camarão',
                description:
                    'Bobó de camarão é um prato da culinária afro-brasileira. De consistência cremosa, é feito com camarões refogados em temperos verdes e leite de coco.',
                picture: '',
                price: 40.0,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
            {
                id: 2,
                name: 'Parmigiana',
                description:
                    'Bife à parmegiana ou filé à parmegiana, um prato brasileiro, é um tipo de bife frito, composto por um pedaço de carne fatiado, empanado com farinha de trigo e ovos (clara de ovo), coberto com queijo do tipo parmesão e bastante molho de tomate e condimentos como orégano a gosto.',
                picture: '',
                price: 45.0,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
            {
                id: 3,
                name: 'Carreteiro',
                description:
                    'É feito de arroz ao qual se adiciona carne bovina bem picada e refogada, carne-seca ou carne de sol desfiada ou picada, às vezes paio, bacon e linguiça em pedaços, refogados em bastante gordura, com alho, cebola, tomate e cheiro-verde, sempre com bastante tempero.',
                picture: '',
                price: 20,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
        ];

        const Ingredients = [
            { id: 1, name: 'Camarão', amount: '300g', dish_id: 1 },
            { id: 2, name: 'Tempero', amount: '1mg', dish_id: 1 },
            { id: 3, name: 'Arroz', amount: '60g', dish_id: 2 },
            { id: 4, name: 'Bife', amount: '100g', dish_id: 2 },
            { id: 5, name: 'Arroz', amount: '60g', dish_id: 3 },
            { id: 6, name: 'Picadinho de carne', amount: '100g', dish_id: 3 },
        ];

        const Categories = [
            {
                id: 1,
                name: 'Refeição',
                description: null,
            },
            {
                id: 2,
                name: 'Bebida',
                description: null,
            },
            {
                id: 3,
                name: 'Sobremesa',
                description: null,
            },
        ];

        const expected = {
            id: 2,
            name: 'Parmigiana',
            description:
                'Bife à parmegiana ou filé à parmegiana, um prato brasileiro, é um tipo de bife frito, composto por um pedaço de carne fatiado, empanado com farinha de trigo e ovos (clara de ovo), coberto com queijo do tipo parmesão e bastante molho de tomate e condimentos como orégano a gosto.',
            picture: '',
            price: 45.0,
            category_id: 1,
            updated_at: '24/05/2023',
            created_at: '24/05/2023',
            ingredients: [
                { id: 3, name: 'Arroz', amount: '60g', dish_id: 2 },
                { id: 4, name: 'Bife', amount: '100g', dish_id: 2 },
            ],
        };

        const dishRepositoryInMemory = new DishRepositoryInMemory(Dishes, Ingredients, Categories);
        const dishService = new DishService(dishRepositoryInMemory);
        //{ 0: result }
        const result = await dishService.show(2);

        expect(result).toEqual(expected);
    });
    it('should create a item', async () => {
        let Dishes = [
            {
                id: 1,
                name: 'Bobo de camarão',
                description:
                    'Bobó de camarão é um prato da culinária afro-brasileira. De consistência cremosa, é feito com camarões refogados em temperos verdes e leite de coco.',
                picture: '',
                price: 40.0,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
            {
                id: 2,
                name: 'Parmigiana',
                description:
                    'Bife à parmegiana ou filé à parmegiana, um prato brasileiro, é um tipo de bife frito, composto por um pedaço de carne fatiado, empanado com farinha de trigo e ovos (clara de ovo), coberto com queijo do tipo parmesão e bastante molho de tomate e condimentos como orégano a gosto.',
                picture: '',
                price: 45.0,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
            {
                id: 3,
                name: 'Carreteiro',
                description:
                    'É feito de arroz ao qual se adiciona carne bovina bem picada e refogada, carne-seca ou carne de sol desfiada ou picada, às vezes paio, bacon e linguiça em pedaços, refogados em bastante gordura, com alho, cebola, tomate e cheiro-verde, sempre com bastante tempero.',
                picture: '',
                price: 20,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
        ];

        let Ingredients = [
            { id: 1, name: 'Camarão', amount: '300g', dish_id: 1 },
            { id: 2, name: 'Tempero', amount: '1mg', dish_id: 1 },
            { id: 3, name: 'Arroz', amount: '60g', dish_id: 2 },
            { id: 4, name: 'Bife', amount: '100g', dish_id: 2 },
            { id: 5, name: 'Arroz', amount: '60g', dish_id: 3 },
            { id: 6, name: 'Picadinho de carne', amount: '100g', dish_id: 3 },
        ];

        const Categories = [
            {
                id: 1,
                name: 'Refeição',
                description: null,
            },
            {
                id: 2,
                name: 'Bebida',
                description: null,
            },
            {
                id: 3,
                name: 'Sobremesa',
                description: null,
            },
        ];

        const dish = {
            name: 'Frango Assado',
            description: 'Frango de Padaria com batata frita.',
            picture: '',
            price: 20.0,
            category_id: 1,
            ingredients: [
                { name: 'Frango', amount: '60g' },
                { name: 'Batata-frita', amount: '100g' },
            ],
        };

        const dishRepositoryInMemory = new DishRepositoryInMemory(Dishes, Ingredients, Categories);
        const dishService = new DishService(dishRepositoryInMemory);

        const id = await dishService.create(dish);

        expect(id).not.toBeNull();
    });
    it('should update a item', async () => {
        let Dishes = [
            {
                id: 1,
                name: 'Bobo de camarão',
                description:
                    'Bobó de camarão é um prato da culinária afro-brasileira. De consistência cremosa, é feito com camarões refogados em temperos verdes e leite de coco.',
                picture: '',
                price: 40.0,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
            {
                id: 2,
                name: 'Parmigiana',
                description:
                    'Bife à parmegiana ou filé à parmegiana, um prato brasileiro, é um tipo de bife frito, composto por um pedaço de carne fatiado, empanado com farinha de trigo e ovos (clara de ovo), coberto com queijo do tipo parmesão e bastante molho de tomate e condimentos como orégano a gosto.',
                picture: '',
                price: 45.0,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
            {
                id: 3,
                name: 'Carreteiro',
                description:
                    'É feito de arroz ao qual se adiciona carne bovina bem picada e refogada, carne-seca ou carne de sol desfiada ou picada, às vezes paio, bacon e linguiça em pedaços, refogados em bastante gordura, com alho, cebola, tomate e cheiro-verde, sempre com bastante tempero.',
                picture: '',
                price: 20,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
        ];

        let Ingredients = [
            { id: 1, name: 'Camarão', amount: '300g', dish_id: 1 },
            { id: 2, name: 'Tempero', amount: '1mg', dish_id: 1 },
            { id: 3, name: 'Arroz', amount: '60g', dish_id: 2 },
            { id: 4, name: 'Bife', amount: '100g', dish_id: 2 },
            { id: 5, name: 'Arroz', amount: '60g', dish_id: 3 },
            { id: 6, name: 'Picadinho de carne', amount: '100g', dish_id: 3 },
        ];

        const Categories = [
            {
                id: 1,
                name: 'Refeição',
                description: null,
            },
            {
                id: 2,
                name: 'Bebida',
                description: null,
            },
            {
                id: 3,
                name: 'Sobremesa',
                description: null,
            },
        ];

        const dish = {
            id: 2,
            name: 'Frango Assado',
            description: 'Frango de Padaria com batata frita.',
            picture: '',
            price: 20.0,
            category_id: 1,
            ingredients: [
                { name: 'Frango', amount: '60g' },
                { name: 'Batata-frita', amount: '100g' },
            ],
        };

        const dishRepositoryInMemory = new DishRepositoryInMemory(Dishes, Ingredients, Categories);
        const dishService = new DishService(dishRepositoryInMemory);

        Ingredients = await dishService.update(dish);

        const matchingDish = Dishes.find(item => item.name === dish.name && item.id === dish.id);

        expect(matchingDish).toBeDefined();

        dish.ingredients.forEach(ingredient => {
            const matchingIngredient = Ingredients.find(
                item => item.name === ingredient.name && item.dish_id === dish.id
            );
            expect(matchingIngredient).toBeDefined();
        });
    });
    it('should delete a item', async () => {
        let Dishes = [
            {
                id: 1,
                name: 'Bobo de camarão',
                description:
                    'Bobó de camarão é um prato da culinária afro-brasileira. De consistência cremosa, é feito com camarões refogados em temperos verdes e leite de coco.',
                picture: '',
                price: 40.0,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
            {
                id: 2,
                name: 'Parmigiana',
                description:
                    'Bife à parmegiana ou filé à parmegiana, um prato brasileiro, é um tipo de bife frito, composto por um pedaço de carne fatiado, empanado com farinha de trigo e ovos (clara de ovo), coberto com queijo do tipo parmesão e bastante molho de tomate e condimentos como orégano a gosto.',
                picture: '',
                price: 45.0,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
            {
                id: 3,
                name: 'Carreteiro',
                description:
                    'É feito de arroz ao qual se adiciona carne bovina bem picada e refogada, carne-seca ou carne de sol desfiada ou picada, às vezes paio, bacon e linguiça em pedaços, refogados em bastante gordura, com alho, cebola, tomate e cheiro-verde, sempre com bastante tempero.',
                picture: '',
                price: 20,
                category_id: 1,
                updated_at: '24/05/2023',
                created_at: '24/05/2023',
            },
        ];

        let Ingredients = [
            { id: 1, name: 'Camarão', amount: '300g', dish_id: 1 },
            { id: 2, name: 'Tempero', amount: '1mg', dish_id: 1 },
            { id: 3, name: 'Arroz', amount: '60g', dish_id: 2 },
            { id: 4, name: 'Bife', amount: '100g', dish_id: 2 },
            { id: 5, name: 'Arroz', amount: '60g', dish_id: 3 },
            { id: 6, name: 'Picadinho de carne', amount: '100g', dish_id: 3 },
        ];

        const Categories = [
            {
                id: 1,
                name: 'Refeição',
                description: null,
            },
            {
                id: 2,
                name: 'Bebida',
                description: null,
            },
            {
                id: 3,
                name: 'Sobremesa',
                description: null,
            },
        ];

        const idToDelete = 1;
        const initialDishesLength = Dishes.length;
        const initialIngredientsLength = Ingredients.length;

        const dishRepositoryInMemory = new DishRepositoryInMemory(Dishes, Ingredients, Categories);
        const dishService = new DishService(dishRepositoryInMemory);

        const [dishes, ingredients] = await dishService.delete(idToDelete);

        const filteredDishes = dishes.filter(dish => dish.id === idToDelete);
        const filteredIngredients = ingredients.filter(
            ingredient => ingredient.dish_id === idToDelete
        );

        expect(Dishes.length).toBe(initialDishesLength - filteredDishes.length);
        expect(Ingredients.length).toBe(initialIngredientsLength - filteredIngredients.length);
    });
});
