import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO'
import { Rental } from '../infra/typeorm/entites/Rentals'

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental | null>
  findOpenRentalByUser(user_id: string): Promise<Rental | null>
  create(data: ICreateRentalDTO): Promise<Rental>
  findById(id: string): Promise<Rental | null>
  findByUser(user_id: string): Promise<Rental[]>
}

export { IRentalsRepository }
