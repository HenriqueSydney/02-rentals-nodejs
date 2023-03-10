import { randomUUID } from 'crypto'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'

import { User } from './User'

@Entity('users_tokens')
class UserTokens {
  @PrimaryColumn('uuid')
  id: string

  @Column('varchar')
  refresh_token: string

  @Column('uuid')
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column('timestamp')
  expires_date: Date

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = randomUUID()
    }
  }
}

export { UserTokens }
