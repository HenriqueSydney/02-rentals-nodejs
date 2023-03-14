import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm'

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { CarImage } from '../entities/CarImage'

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage)
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    })

    await this.repository.save(carImage)

    return carImage
  }

  async findByCarId(car_id: string): Promise<CarImage[]> {
    const CarImages = await this.repository.find({
      where: {
        car_id,
      },
    })

    return CarImages
  }

  async delete(car_id: string): Promise<void> {
    await this.repository.delete({ car_id })
  }
}

export { CarsImagesRepository }
