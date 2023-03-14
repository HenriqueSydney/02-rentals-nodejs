import { randomUUID } from 'crypto'

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('cars_image')
class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  car_id: string

  @Column('varchar')
  image_name: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = randomUUID()
    }
  }
}

export { CarImage }
