import knex from "../database/knex/index.js";

export class ProfileRepository {

    constructor() {
        this.Profile = () => knex('profile');
    }

    async showAll(){
        const profiles = await this.Profile();
        
        return profiles;
    }

    async findById(id) {
       const profile = await this.Profile().where({id});

       return profile;
    }


}
