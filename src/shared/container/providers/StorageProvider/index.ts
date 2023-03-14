import { container } from 'tsyringe'
import { LocalStorageProvider } from './implementations/LocalStorageProvider'
import { S3StorageProvider } from './implementations/S3StorageProvider'
import { IStorageProvider } from './IStorageProvider'

const diskStorage =
  !process.env.disk || process.env.disk === 'local'
    ? LocalStorageProvider
    : S3StorageProvider

container.registerSingleton<IStorageProvider>('StorageProvider', diskStorage)
