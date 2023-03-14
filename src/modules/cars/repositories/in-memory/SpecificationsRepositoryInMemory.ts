import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = []

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, {
      description,
      name,
    })
    this.specifications.push(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = this.specifications.find(
      (specification) => specification.name === name,
    )

    if (specification === undefined) {
      return null
    }

    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id as string),
    )

    return allSpecifications
  }
}

export { SpecificationsRepositoryInMemory }
