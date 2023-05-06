import knex from "../database/knex/index.js";

export class ProfileController {

    async index(request, response){

        const Profile = () => knex('profile');

        const profiles = await Profile().select();

        return response.status(200).json(profiles);
    }
    
    async show(request, response){
        const { id } = request.params;
        
        return response.status(200).json({id});
    }
    
    async create(request, response){
        const {name, password, email, avatar} = request.body;
        
        return response.status(201).json({name, password, email, avatar});
    }
    
    async update(request, response){
        const {name, password, email, avatar} = request.body;
        
        return response.status(200).json({name, password, email, avatar});
    }
    
    async delete(request, response){
        const {id} = request.params;
        
        return response.status(202).json({id});
    }
}