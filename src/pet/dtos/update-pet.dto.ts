import { GenderEnum } from '../enums/gender.enum';

export class UpdatePetDto {
  name?: string
  age?: Date
  nickname?: string
  gender?: GenderEnum
}