import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { randomUUID } from 'crypto'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('rentals')
class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car

  @Column('uuid')
  car_id: string

  @Column('uuid')
  user_id: string

  @Column('timestamp')
  start_date: Date

  @Column('timestamp')
  end_date: Date

  @Column('timestamp')
  expected_return_date: Date

  @Column('numeric')
  total: number

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = randomUUID()
    }
  }
}

export { Rental }
