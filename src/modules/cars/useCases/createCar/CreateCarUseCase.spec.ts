import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      brand: 'Brand',
      category_id: 'category',
      fine_amount: 60,
      license_plate: 'ABC 1234',
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a new car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      brand: 'Brand',
      category_id: 'category',
      fine_amount: 60,
      license_plate: 'ABC 1234',
    })

    await expect(
      createCarUseCase.execute({
        name: 'Name Car2',
        description: 'Description Car2',
        daily_rate: 100,
        brand: 'Brand2',
        category_id: 'category2',
        fine_amount: 60,
        license_plate: 'ABC 1234',
      }),
    ).rejects.toEqual(new AppError('Car already exists!'))
  })

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car Available',
      description: 'Description Car',
      daily_rate: 100,
      brand: 'Brand',
      category_id: 'category',
      fine_amount: 60,
      license_plate: 'ABCD 1234',
    })

    expect(car.available).toBe(true)
  })
})
