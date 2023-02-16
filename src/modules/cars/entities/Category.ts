import { randomUUID } from 'crypto'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity('categories')
class Category {
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

export { Category }
