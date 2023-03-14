import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory'
import { UserRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory'

import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUsersDTO'
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase'

import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase'

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'

import { AppError } from '@shared/errors/AppError'

let usersRepositoryInMemory: UserRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let dateProvider: DayjsDateProvider

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    )

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user and create token', async () => {
    const user: ICreateUsersDTO = {
      driver_license: '000123',
      name: 'User Test',
      password: '123456',
      email: 'user.test@test.com',
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'nonexistentUserEmail@falseEmail.com',
        password: '12345',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'))
  })

  it('should not be able to authenticate an user with incorrect password', async () => {
    const user: ICreateUsersDTO = {
      driver_license: '000123',
      name: 'User Test',
      password: '123456',
      email: 'user.test@test.com',
    }

    await createUserUseCase.execute(user)

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong_password',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'))
  })

  it('should not be able to authenticate an user with incorrect email', async () => {
    const user: ICreateUsersDTO = {
      driver_license: '000123',
      name: 'User Test',
      password: '123456',
      email: 'user.test@test.com',
    }

    await createUserUseCase.execute(user)

    await expect(
      authenticateUserUseCase.execute({
        email: 'wrong.email@test.com',
        password: user.password,
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'))
  })
})
