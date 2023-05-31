import knex from '../../database/knex/index.js';

export class StatusRepository {
    constructor() {
        this.Status = () => knex('status');
    }

    async findAll() {
        const status = await this.Status();

        return status;
    }

    async findById(id) {
        const status = await this.Status().where({ id });

        return status;
    }
}
