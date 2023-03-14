import { ICreateUsersTokensDTO } from '../dtos/ICreateUserTokenDTO'
import { UserTokens } from '../infra/typeorm/entites/UserTokens'

interface IUsersTokensRepository {
  create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUsersTokensDTO): Promise<UserTokens>

  deleteById(id: string): Promise<void>

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens | null>

  findByRefreshToken(refreshToken: string): Promise<UserTokens | null>
}

export { IUsersTokensRepository }
