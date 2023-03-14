import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/typeorm'
import { User } from '../entites/User'

import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUsersDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id,
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } })

    return user
  }
}

export { UsersRepository }
