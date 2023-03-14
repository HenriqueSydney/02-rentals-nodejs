import { randomUUID } from 'crypto'
import {
  CreateDateColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('specifications')
class Specification {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column('varchar')
  name: string

  @Column('varchar')
  description: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = randomUUID()
    }
  }
}

export { Specification }
