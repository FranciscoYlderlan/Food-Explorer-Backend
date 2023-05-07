export class DishController {
    async index(request, response) {
        return response.status(200).json({});
    }

    async show(request, response) {
        const { id } = request.params;

        return response.status(200).json({ id });
    }

    async create(request, response) {
        const { name, description, picture, price, category } = request.body;

        return response.status(201).json({ name, password, email, avatar });
    }

    async update(request, response) {
        const { name, description, picture, price, category } = request.body;
        const { id } = request.params;

        return response.status(200).json({ name, password, email, avatar });
    }

    async delete(request, response) {
        const { id } = request.params;

        return response.status(202).json({ id });
    }
}
