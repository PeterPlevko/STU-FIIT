import { IsNotEmpty } from 'class-validator';
export class MemorialDto {
  @IsNotEmpty()
  GPS: string;

  municipalityDescription: string;

  @IsNotEmpty()
  name: string;

  file: File;

  imagePath;

  location: string;

  photoDescription: string;

  deceasedList: string[];

  dateOfBirth: string[];

  dateOfDeath: string[];

  addedBy: string;
}
