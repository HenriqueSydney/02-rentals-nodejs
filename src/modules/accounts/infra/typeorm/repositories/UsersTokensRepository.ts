import { AppDataSource } from '@shared/infra/typeorm'
import { Repository } from 'typeorm'

import { ICreateUsersTokensDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'

import { UserTokens } from '../entites/UserTokens'

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = AppDataSource.getRepository(UserTokens)
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    })

    await this.repository.save(userToken)

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens | null> {
    const userTokens = await this.repository.findOne({
      where: { user_id, refresh_token },
    })

    return userTokens
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens | null> {
    const userToken = await this.repository.findOne({
      where: { refresh_token: refreshToken },
    })

    return userToken
  }
}

export { UsersTokensRepository }
