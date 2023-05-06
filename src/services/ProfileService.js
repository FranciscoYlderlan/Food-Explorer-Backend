import { AppError } from "../utils/AppError.js";

export class ProfileService {

    constructor(repository) {
        this.repository = repository;
    }

    async index() {
        
        const profiles = await this.repository.showAll();
        
        return profiles
    }

    async show(id) {
        
        const profile = await this.repository.findById(id);
        
        if(!profile) new AppError('Perfil não encontrado', 404);

        return profile;

    }

    async create(request, response) {
        
    }

    async update(request, response) {
        
    }

    async delete(request, response) {
        
    }

}