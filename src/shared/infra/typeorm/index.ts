import { DataSource } from 'typeorm'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { User } from '@modules/accounts/infra/typeorm/entites/User'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'
import { Rental } from '@modules/rentals/infra/typeorm/entites/Rentals'
import { UserTokens } from '@modules/accounts/infra/typeorm/entites/UserTokens'
// npm run typeorm_create migration:create -n src/shared/infra/typeorm/migrations/CreateCars
const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'docker',
  password: '123456',
  database: 'rentx',
  migrationsTableName: 'migrations',
  logging: false,
  name: 'default',
  entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  subscribers: [],
})

export async function createConnection(): Promise<DataSource> {
  const host = process.env.NODE_ENV === 'test' ? 'localhost' : 'database'

  const database =
    process.env.NODE_ENV === 'test'
      ? 'rentex_test'
      : (AppDataSource.options.database as string)

  return await AppDataSource.setOptions({
    host,
    database,
  }).initialize()
}

export { AppDataSource }
