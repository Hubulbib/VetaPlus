import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VisitService } from './visit.service';
import { Visit } from './visit.entity';
import { CreateVisitDto } from './dtos/create-visit.dto';
import { UpdateVisitDto } from './dtos/update-visit.dto';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Get()
  findAll(): Promise<Visit[]> {
    return this.visitService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Visit> {
    return this.visitService.findOne(+id)
  }

  @Post(':petId')
  create(@Param('petId') petId: string, @Body() createVisitDto: CreateVisitDto): Promise<void> {
    return this.visitService.create(+petId, createVisitDto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitService.update(+id, updateVisitDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitService.remove(+id)
  }
}
