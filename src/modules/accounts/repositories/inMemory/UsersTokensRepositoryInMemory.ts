import { ICreateUsersTokensDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { UserTokens } from '@modules/accounts/infra/typeorm/entites/UserTokens'
import { IUsersTokensRepository } from '../IUsersTokensRepository'

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = []
  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    })

    this.usersTokens.push(userToken)

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((userToken) => userToken.id === id)

    if (userToken) {
      this.usersTokens.splice(this.usersTokens.indexOf(userToken))
    }
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens | null> {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    )

    return userToken || null
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens | null> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refreshToken,
    )

    return userToken || null
  }
}

export { UsersTokensRepositoryInMemory }
