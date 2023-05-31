import knex from '../../database/knex/index.js';

export class ProfileRepository {
    constructor() {
        this.Profiles = () => knex('profile');
    }

    async findAll() {
        const profiles = await this.Profiles();

        return profiles;
    }

    async findById(id) {
        const profile = await this.Profiles().where({ id });

        return profile;
    }
}
