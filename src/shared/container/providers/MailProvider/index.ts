import { container } from 'tsyringe'

import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { EtherealMailProvider } from './implementations/EtherealMailProvider'
import { SESMailProvider } from './implementations/SESMailProvider'

const mailProviders = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
}

const mailProvider =
  !process.env.MAIL_PROVIDER || process.env.MAIL_PROVIDER === 'ethereal'
    ? mailProviders.ethereal
    : mailProviders.ses

container.registerInstance<IMailProvider>('MailProvider', mailProvider)
