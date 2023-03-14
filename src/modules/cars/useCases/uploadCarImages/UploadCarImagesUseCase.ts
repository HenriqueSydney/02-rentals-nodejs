import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const savedCarsImages = await this.carsImagesRepository.findByCarId(car_id)

    if (savedCarsImages) {
      savedCarsImages.map(async (savedCarsImages) => {
        await this.storageProvider.delete(savedCarsImages.image_name, 'cars')
      })
    }

    await this.carsImagesRepository.delete(car_id)

    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image)
      await this.storageProvider.save(image, 'cars')
    })
  }
}

export { UploadCarImagesUseCase }