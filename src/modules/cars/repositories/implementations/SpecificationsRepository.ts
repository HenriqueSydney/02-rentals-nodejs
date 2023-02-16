import { Repository } from 'typeorm'
import { AppDataSource } from '../../../../database'
import { Specification } from '../../entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = this.repository.findOne({ where: { name } })

    return specification
  }
}

export { SpecificationsRepository }
