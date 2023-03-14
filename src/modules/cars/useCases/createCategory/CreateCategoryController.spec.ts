import request from 'supertest'

import { app } from '@shared/infra/http/app'
import { AppDataSource, createConnection } from '@shared/infra/typeorm'

import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'

describe('Create Category Controller', () => {
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

  it('should be able to create category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin',
    })

    const { refresh_token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to create category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin',
    })

    const { token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(401)
  })
})
