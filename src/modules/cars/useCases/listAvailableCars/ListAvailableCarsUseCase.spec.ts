import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarUseCase } from './ListAvailableCarsUseCase'

let listCarsUseCase: ListAvailableCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test',
      description: 'Car description',
      daily_rate: 140,
      brand: 'brand',
      category_id: 'category_id',
      fine_amount: 100,
      license_plate: 'DEV-TOP',
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test',
      description: 'Car description',
      daily_rate: 140,
      brand: 'brand_test',
      category_id: 'category_id',
      fine_amount: 100,
      license_plate: 'DEV-TOP',
    })

    const cars = await listCarsUseCase.execute({
      brand: 'brand_test',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test3',
      description: 'Car description',
      daily_rate: 140,
      brand: 'brand_test',
      category_id: 'category_id',
      fine_amount: 100,
      license_plate: 'DEV-TOP',
    })

    const cars = await listCarsUseCase.execute({
      name: 'Car Test3',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test3',
      description: 'Car description',
      daily_rate: 140,
      brand: 'brand_test',
      category_id: 'category_id2',
      fine_amount: 100,
      license_plate: 'DEV-TOP',
    })

    const cars = await listCarsUseCase.execute({
      category_id: 'category_id2',
    })

    expect(cars).toEqual([car])
  })
})
