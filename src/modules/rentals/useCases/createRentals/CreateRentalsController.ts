import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRentalsUseCase } from './CreateRentalsUseCase'

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const { car_id, expected_return_date } = request.body

    const createRentalUseCase = container.resolve(CreateRentalsUseCase)

    const rental = await createRentalUseCase.execute({
      user_id: id,
      car_id,
      expected_return_date,
    })

    return response.status(201).json(rental)
  }
}

export { CreateRentalController }
