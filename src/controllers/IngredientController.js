export class IngredientController {
    index(request, response) {
        return response.status(200).json({});
    }

    show(request, response) {
        const { id } = request.params;

        return response.status(200).json({ id });
    }

    create(request, response) {
        const { name, password, email, avatar } = request.body;

        return response.status(201).json({ name, password, email, avatar });
    }

    update(request, response) {
        const { name, password, email, avatar } = request.body;

        return response.status(200).json({ name, password, email, avatar });
    }

    delete(request, response) {
        const { id } = request.params;

        return response.status(202).json({ id });
    }
}
