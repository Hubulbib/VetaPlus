import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';
import { CreatePetDto } from './dtos/create-pet.dto';
import { UpdatePetDto } from './dtos/update-pet.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  findAll(): Promise<Pet[]>{
    return this.petService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pet> {
    return this.petService.findOne(+id)
  }

  @Post(':clientId')
  create(@Param('clientId') clientId: string, @Body() createPetDto: CreatePetDto): Promise<void> {
    return this.petService.create(+clientId, createPetDto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto): Promise<void> {
    return this.petService.update(+id, updatePetDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.petService.remove(+id)
  }
}
