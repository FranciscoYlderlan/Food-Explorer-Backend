import { CategoryRepositoryInMemory } from '../../repositories/category/RepositoryInMemory.js';
import { CategoryService } from '../category/CategoryService.js';

describe('CategoryService', () => {
    it('should show all items', async () => {
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
        const categoryRepositoryInMemory = new CategoryRepositoryInMemory(Categories);
        const categoryService = new CategoryService(categoryRepositoryInMemory);
        const result = await categoryService.index();

        expect(result).toHaveLength(Categories.length);

        Categories.forEach(item => {
            expect(result).toContain(item);
        });
    });

    it('should show specific item', async () => {
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

        const categoryRepositoryInMemory = new CategoryRepositoryInMemory(Categories);
        const categoryService = new CategoryService(categoryRepositoryInMemory);

        Categories.forEach(async item => {
            const [result] = await categoryService.show(item.id);
            expect(result).toBe(item);
        });
    });
});
