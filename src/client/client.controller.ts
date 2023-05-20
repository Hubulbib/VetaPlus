import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { IClient } from './interfaces/client.interface';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll(): Promise<IClient[]> {
    return this.clientService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IClient>{
    return this.clientService.findOne(+id)
  }

  @Post()
  create(@Body() body: CreateClientDto): Promise<void> {
    return this.clientService.create(body)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateClientDto): Promise<void> {
    return this.clientService.update(+id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.clientService.remove(+id)
  }
}
