import { IngredientRepositoryInMemory } from '../../repositories/ingredient/RepositoryInMemory.js';
import { IngredientService } from '../ingredient/IngredientService.js';

describe('IngredientService', () => {
    it('should show all items', async () => {
        const Ingredients = [
            {
                id: 1,
                name: 'Farofa',
                picture: null,
                amount: null,
                dish_id: 1,
                created_at: '2023-05-08 19:23:12',
                updated_at: '2023-05-08 19:23:12',
            },
            {
                id: 2,
                name: 'carne',
                picture: null,
                amount: null,
                dish_id: 2,
                created_at: '2023-05-08 19:23:12',
                updated_at: '2023-05-08 19:23:12',
            },
            {
                id: 3,
                name: 'Espeto',
                picture: null,
                amount: null,
                dish_id: 3,
                created_at: '2023-05-08 19:23:12',
                updated_at: '2023-05-08 19:23:12',
            },
        ];

        const ingredientRepositoryInMemory = new IngredientRepositoryInMemory(Ingredients);
        const ingredientService = new IngredientService(ingredientRepositoryInMemory);

        const result = await ingredientService.index();

        expect(result).toHaveLength(Ingredients.length);

        Ingredients.forEach(item => {
            expect(result).toContain(item);
        });
    });

    it('should show specific item', async () => {
        const Ingredients = [
            {
                id: 1,
                name: 'Farofa',
                picture: null,
                amount: null,
                dish_id: 1,
                created_at: '2023-05-08 19:23:12',
                updated_at: '2023-05-08 19:23:12',
            },
            {
                id: 2,
                name: 'carne',
                picture: null,
                amount: null,
                dish_id: 2,
                created_at: '2023-05-08 19:23:12',
                updated_at: '2023-05-08 19:23:12',
            },
            {
                id: 3,
                name: 'Espeto',
                picture: null,
                amount: null,
                dish_id: 3,
                created_at: '2023-05-08 19:23:12',
                updated_at: '2023-05-08 19:23:12',
            },
        ];

        const ingredientRepositoryInMemory = new IngredientRepositoryInMemory(Ingredients);
        const ingredientService = new IngredientService(ingredientRepositoryInMemory);

        Ingredients.forEach(async item => {
            const result = await ingredientService.show(item.id);
            expect(result).toBe(item);
        });
    });
});
