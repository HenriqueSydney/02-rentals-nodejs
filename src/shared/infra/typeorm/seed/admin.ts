import 'reflect-metadata'
import { createConnection, AppDataSource } from '@shared/infra/typeorm'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'

async function create() {
  const id = randomUUID()
  const password = await hash('admin', 8)

  await createConnection('localhost')

  await AppDataSource.query(
    `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
            values ('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'xxxxx')`,
  )

  await AppDataSource.destroy()
}

create().then(() => console.log('User admin created'))
