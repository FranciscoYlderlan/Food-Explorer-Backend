import { ProfileRepository } from '../repositories/profile/Repository.js';
import { ProfileService } from '../services/profile/ProfileService.js';

export class ProfileController {
    async index(request, response) {
        const profileRepository = new ProfileRepository();
        const profileService = new ProfileService(profileRepository);

        const profiles = await profileService.index();

        return response.status(200).json(profiles);
    }

    async show(request, response) {
        const { id } = request.params;

        const profileRepository = new ProfileRepository();
        const profileService = new ProfileService(profileRepository);

        const profile = await profileService.show(id);

        return response.status(200).json(profile);
    }

    async create(request, response) {
        const { name } = request.body;

        return response.status(201).json({ name, password, email, avatar });
    }

    async update(request, response) {
        const { name } = request.body;

        return response.status(200).json({ name });
    }

    async delete(request, response) {
        const { id } = request.params;

        return response.status(202).json({ id });
    }
}
