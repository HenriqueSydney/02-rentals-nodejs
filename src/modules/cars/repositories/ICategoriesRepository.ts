import { Category } from '@modules/cars/infra/typeorm/entities/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}
// | undefined
interface ICategoriesRepository {
  findByName(name: string): Promise<Category | null>
  list(): Promise<Category[]>
  create({ name, description }: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCategoryDTO }
