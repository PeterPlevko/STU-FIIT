import { IsNotEmpty } from 'class-validator';
export class MemorialDto {
  @IsNotEmpty()
  GPS: string;

  municipalityDescription: string;

  @IsNotEmpty()
  name: string;

  imagePath: string;

  file: File;

  id: string;

  state: string;

  location: string;

  photoDescription: string;

  deceasedList: string[];

  dateOfBirth: Date[];

  dateOfDeath: Date[];

  addedBy: string;
}
