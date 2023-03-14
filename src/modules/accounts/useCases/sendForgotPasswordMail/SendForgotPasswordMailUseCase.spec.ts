import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'
import { UserRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory'
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/inMemory/MailProviderInMemory'
import { AppError } from '@shared/errors/AppError'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersRepositoryInMemory: UserRepositoryInMemory
let mailProvider: MailProviderInMemory

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    )
  })
  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    await usersRepositoryInMemory.create({
      driver_license: '1666938920',
      email: 'savofu@co.pa',
      name: 'Jackson Tate',
      password: '123456',
    })

    await sendForgotPasswordMailUseCase.execute('savofu@co.pa')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('jogfuj@rantophib.no'),
    ).rejects.toEqual(new AppError('User does not exists!'))
  })

  it('shoul be able to create an user token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create',
    )

    await usersRepositoryInMemory.create({
      driver_license: '11281641',
      email: 'piwvifgi@hituki.bs',
      name: 'Douglas Mendoza',
      password: '123456',
    })

    await sendForgotPasswordMailUseCase.execute('piwvifgi@hituki.bs')

    expect(generateTokenMail).toBeCalled()
  })
})
