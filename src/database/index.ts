import { DataSource } from 'typeorm'
import { Category } from '../modules/cars/entities/Category'
// import { Specification } from "../modules/cars/entities/Specification";

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
  entities: [Category],
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: [],
})

export function createConnection(host = 'database'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize()
}

export { AppDataSource }
