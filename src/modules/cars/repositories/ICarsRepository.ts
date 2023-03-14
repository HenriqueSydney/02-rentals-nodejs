import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '../infra/typeorm/entities/Car'

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car | null>
  findById(id: string): Promise<Car | null>
  findAllAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]>
  updateAvailable(id: string, available: boolean): Promise<void>
}

export { ICarsRepository }
