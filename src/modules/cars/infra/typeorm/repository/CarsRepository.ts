import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm'
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = AppDataSource.getRepository(Car)
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      specifications,
      id,
    })

    await this.repository.save(car)

    return car
  }

  async findAllAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('cars')
      .where('cars.available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere('cars.brand = :brand', { brand })
    }

    if (name) {
      carsQuery.andWhere('cars.name = :name', { name })
    }

    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', { category_id })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async findById(id: string): Promise<Car | null> {
    const car = await this.repository.findOne({ where: { id } })

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    const car = await this.repository.findOne({ where: { license_plate } })

    return car
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({
        available,
      })
      .where('id = :id', { id })
      .execute()
  }
}

export { CarsRepository }
