import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { Rental } from '@modules/rentals/infra/typeorm/entites/Rentals'

import { IRentalsRepository } from '../IRentalsRepository'

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()
    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    })

    this.rentals.push(rental)

    return rental
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    const rental = await this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date,
    )

    return rental || null
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date,
    )

    if (rental === undefined) {
      return null
    }

    return rental
  }

  async findById(id: string): Promise<Rental | null> {
    const rental = this.rentals.find((rental) => rental.id === id)
    return rental || null
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rental = this.rentals.filter((rental) => rental.user_id === user_id)
    return rental
  }
}

export { RentalsRepositoryInMemory }
