import { IsNull, Repository } from 'typeorm'
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { Rental } from '../entites/Rentals'
import { AppDataSource } from '@shared/infra/typeorm'

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = AppDataSource.getRepository(Rental)
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total,
    })

    await this.repository.save(rental)

    return rental
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    const openByCarRental = await this.repository.findOne({
      where: { car_id, end_date: IsNull() },
    })
    return openByCarRental
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    const openByUserRental = await this.repository.findOne({
      where: { user_id, end_date: IsNull() },
    })
    return openByUserRental
  }

  async findById(id: string): Promise<Rental | null> {
    const rental = await this.repository.findOne({ where: { id } })
    return rental
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const userRentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    })

    return userRentals
  }
}

export { RentalsRepository }
