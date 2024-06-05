import { IsNotEmpty } from 'class-validator';

class RelatedTo {
  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  shortcut: string;

  @IsNotEmpty()
  firebaseUserUID: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  id: string;
}

export class GetAnnotationsResponse {
  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  shortcut: string;

  @IsNotEmpty()
  firebaseUserUID: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  relatedTo: RelatedTo[];

  @IsNotEmpty()
  graphStructure: string;
}
