import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    )
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test',
      description: 'Car description',
      daily_rate: 140,
      brand: 'brand_test',
      category_id: 'category_id',
      fine_amount: 100,
      license_plate: 'DEV-TOP',
    })

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Test',
      description: 'Test',
    })

    const specifications_id = [specification.id] as string[]

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id as string,
      specifications_id,
    })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })

  it('should not be able to add a new specification to a non existent car', async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: '1234',
        specifications_id: ['5544', '1233'],
      }),
    ).rejects.toEqual(new AppError('Car does not exists!'))
  })
})
