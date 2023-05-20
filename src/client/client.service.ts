import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Client} from "./client.entity";
import { Repository } from 'typeorm';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
    ) {}

    findAll = async (): Promise<Client[]> => {
        return this.clientRepository.find();
    }

    findOne = async (id: number): Promise<Client | null> => {
        return this.clientRepository.findOneBy({ id });
    }

    create = async (createClientDto: CreateClientDto): Promise<void> =>  {
        await this.clientRepository.save({...new Client(), ...createClientDto})
    }

    remove = async (id: number): Promise<void> => {
        await this.clientRepository.delete(id);
    }

    update = async (id: number, updateClientDto: UpdateClientDto): Promise<void> => {
        await this.clientRepository.update(id, updateClientDto)
    }
}
