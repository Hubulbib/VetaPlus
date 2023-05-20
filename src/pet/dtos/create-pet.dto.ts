import { GenderEnum } from '../enums/gender.enum';

export class CreatePetDto {
  name: string
  nickname?: string
  gender?: GenderEnum
  age?: Date
}