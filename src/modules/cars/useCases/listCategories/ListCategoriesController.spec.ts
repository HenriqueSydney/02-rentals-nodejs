import request from 'supertest'

import { app } from '@shared/infra/http/app'
import { AppDataSource, createConnection } from '@shared/infra/typeorm'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'

describe('List Categories', () => {
  beforeEach(async () => {
    await createConnection()
    await AppDataSource.runMigrations()

    const id = randomUUID()
    const password = await hash('admin', 8)

    await AppDataSource.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
                values ('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'xxxxx')`,
    )
  })

  afterEach(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
  })

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin',
    })

    const { refresh_token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('Category supertest')
  })
})
