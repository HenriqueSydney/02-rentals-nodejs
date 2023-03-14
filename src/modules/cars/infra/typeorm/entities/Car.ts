import { randomUUID } from 'crypto'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Category } from './Category'
import { Specification } from './Specification'

@Entity('cars')
class Car {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column('varchar')
  name: string

  @Column('varchar')
  description: string

  @Column('numeric')
  daily_rate: number

  @Column('boolean')
  available: boolean

  @Column('varchar')
  license_plate: string

  @Column('numeric')
  fine_amount: number

  @Column('varchar')
  brand: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column('varchar')
  category_id: string

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[]

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = randomUUID()
      this.available = true
    }
  }
}

export { Car }
