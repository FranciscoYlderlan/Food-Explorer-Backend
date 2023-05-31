import { StatusRepositoryInMemory } from '../../repositories/status/RepositoryInMemory.js';
import { StatusService } from '../status/StatusService.js';

describe('StatusService', () => {
    it('should show all items', async () => {
        const Status = [
            {
                id: 1,
                name: 'Pendente',
            },
            {
                id: 2,
                name: 'Preparando',
            },
            {
                id: 3,
                name: 'Entregue',
            },
        ];
        const statusRepositoryInMemory = new StatusRepositoryInMemory(Status);
        const statusService = new StatusService(statusRepositoryInMemory);
        const result = await statusService.index();

        expect(result).toHaveLength(Status.length);

        Status.forEach(item => {
            expect(result).toContain(item);
        });
    });

    it('should show specific item', async () => {
        const Status = [
            {
                id: 1,
                name: 'Pendente',
            },
            {
                id: 2,
                name: 'Preparando',
            },
            {
                id: 3,
                name: 'Entregue',
            },
        ];

        const statusRepositoryInMemory = new StatusRepositoryInMemory(Status);
        const statusService = new StatusService(statusRepositoryInMemory);

        Status.forEach(async item => {
            const [result] = await statusService.show(item.id);
            expect(result).toBe(item);
        });
    });
});
