import { Expose } from 'class-transformer'
import { randomUUID } from 'crypto'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @Column('varchar')
  email: string

  @Column('varchar')
  password: string

  @Column('varchar')
  driver_license: string

  @Column('boolean')
  isAdmin: boolean

  @Column('varchar')
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`

      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`

      default:
        return ''
    }
  }

  constructor() {
    if (!this.id) {
      this.id = randomUUID()
    }
  }
}

export { User }
