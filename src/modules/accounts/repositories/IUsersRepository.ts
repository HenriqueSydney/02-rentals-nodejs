import { ICreateUsersDTO } from '../dtos/ICreateUsersDTO'
import { User } from '../infra/typeorm/entites/User'

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(user_id: string): Promise<User | null>
}

export { IUsersRepository }
