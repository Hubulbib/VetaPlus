import { Injectable } from '@nestjs/common';
import { Visit } from './visit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVisitDto } from './dtos/create-visit.dto';
import { UpdateVisitDto } from './dtos/update-visit.dto';

@Injectable()
export class VisitService {
  constructor(@InjectRepository(Visit) private readonly visitRepository: Repository<Visit>) {}

  findAll = (): Promise<Visit[]> => {
    return this.visitRepository.find({relations: {pet: true}})
  }

  findOne = (id: number): Promise<Visit> => {
    return this.visitRepository.findOne({
      where: {
        id
      },
      relations: {
        pet: true
      }
    })
  }

  create = async(petId: number, createVisitDto: CreateVisitDto): Promise<void> => {
    await this.visitRepository
      .createQueryBuilder('visit')
      .insert()
      .into(Visit)
      .values([
        {pet: {id: petId}, ...createVisitDto}
      ])
      .execute()
  }

  update = async(id: number, updateVisitDto: UpdateVisitDto): Promise<void> => {
    await this.visitRepository
      .createQueryBuilder('visit')
      .update()
      .set({
        ...updateVisitDto,
      })
      .where('id = :id', { id })
      .execute()
  }

  remove = async(id: number): Promise<void> => {
    await this.visitRepository.delete(id)
  }
}
