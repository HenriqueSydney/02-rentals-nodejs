import { ICreateUsersDTO } from '../../dtos/ICreateUsersDTO'
import { User } from '../../infra/typeorm/entites/User'
import { IUsersRepository } from '../IUsersRepository'

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUsersDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (user === undefined) {
      return null
    }

    return user
  }

  async findById(user_id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === user_id)

    if (user === undefined) {
      return null
    }

    return user
  }
}

export { UserRepositoryInMemory }
