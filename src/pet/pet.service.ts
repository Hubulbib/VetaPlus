import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { CreatePetDto } from './dtos/create-pet.dto';
import { UpdatePetDto } from './dtos/update-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  findAll = (): Promise<Pet[]> => {
    return this.petRepository.find({relations: {client: true}})
  }

  findOne = (id: number): Promise<Pet> => {
    return this.petRepository.findOne({
      where: {id},
      relations: {client: true}
    })
  }

  create = async(clientId: number, createPetDto: CreatePetDto): Promise<void> => {
    await this.petRepository
      .createQueryBuilder('pet')
      .insert()
      .into(Pet)
      .values([
        {client: {id: clientId}, ...createPetDto}
      ])
      .execute()
  }

  update = async(id: number, updatePetDto: UpdatePetDto): Promise<void> => {
    await this.petRepository
      .createQueryBuilder('pet')
      .update()
      .set({
        ...updatePetDto,
      })
      .where('id = :id', { id })
      .execute()
  }

  remove = async(id: number): Promise<void> => {
    await this.petRepository.delete(id)
  }
}
