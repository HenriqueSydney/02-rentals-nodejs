import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
      id,
    })

    this.cars.push(car)

    return car
  }

  async findAllAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    const cars = await this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car
      }

      return null
    })

    return cars
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    const car = await this.cars.find(
      (car) => car.license_plate === license_plate,
    )

    if (car === undefined) {
      return null
    }

    return car
  }

  async findById(id: string): Promise<Car | null> {
    const car = await this.cars.find((car) => car.id === id)

    if (car === undefined) {
      return null
    }

    return car
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id)

    this.cars[findIndex].available = available
  }
}

export { CarsRepositoryInMemory }
