import { AppError } from '@shared/errors/AppError'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const avatar_file = request.file?.filename

    if (!avatar_file) {
      throw new AppError('Arquivo do Avatar não foi enviado')
    }

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    updateUserAvatarUseCase.execute({ user_id: id, avatar_file })

    return response.status(204).send()
  }
}

export { UpdateUserAvatarController }
