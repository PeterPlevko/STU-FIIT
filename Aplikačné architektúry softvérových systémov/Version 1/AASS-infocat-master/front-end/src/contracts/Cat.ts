export interface Cat {
  id: string;
  name: string | null;
  countryOrigin: string | null;
  countryCurrent: string | null;
  color: string | null;
  colorCode: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  regNumOrigin: string | null;
  regNumCurrent: string | null;
  breed: Breed;
  additionalInfo: CatInformation | undefined;
  reference: Reference | undefined | null;
  links: Link[] | undefined;
  history: History[];
  src_db: string;
}

export interface Breed {
  id: number;
  code: string;
}

export interface Link {
  id: number | null;
  content: string;
  type: 'HEALTH_RECORD' | 'NOTE' | 'URL' | 'AWARD';
}
export interface History {
  id: number;
  current: string;
  updated: string;
  created: string;
}

export interface Reference {
  id: number;
  father_name: string | undefined;
  mother_name: string | undefined;
  father: Cat | undefined;
  mother: Cat | undefined;
}

export interface CatInformation {
  id: number;
  catId: string;
  titleBefore: string;
  titleAfter: string;
  chip: string;
  verifiedStatus: string;
  cattery: string;
}

export default interface MetaData {
  page: number;
  per_page: number;
  pages: number;
  total: number;
}

export interface AllCats {
  metadata: MetaData;
  items: Cat[];
}

export interface CatName {
  name: string;
  gender: string;
}

export interface AllNames {
  metadata: MetaData;
  items: CatName[];
}

export interface FindCat {
  per_page: number | null;
  page: number | null;
  order_by: string | null;
  order_type: string | null;
  sex: 'male' | 'female' | null;
  born_after: string | null;
  born_before: string | null;
  country: string | null;
  breed: string | null;
  name: string | null;
  ems: string | null;
  id: string | null;
  mother_name: string | null;
  father_name: string | null;
}

export interface FindName {
  sex: 'M' | 'F' | null;
  per_page: number | null;
  page: number | null;
  order_by: string | null;
  order_type: string | null;
  character: string | null;
}

export interface AllDuplicates {
  NAME: string;
  BREED: string;
  COLOR_CODE: string;
  BIRTH_DATE: string;
  GENDER: string;
  CATTERY: string;
}

export interface Top10 {
  CAT_NAME: string;
  CAT_GENDER: string;
  CAT_BREED: string;
  CAT_COLOR_CODE: string;
  CAT_BIRTH_DATE: string;
  CAT_CATTERY: string;
  CAT_DAMERAU_LEVENSHTEIN: number;
  CAT_JACCARD: number;
  CAT_RATCLIFF_OBERSHELP: number;
}

export interface CatFinalDB {
  ID: number;
  NAME: string;
  SOURCE_DB: string;
  SOURCE_ID: number;
  REGISTRATION_NUMBER_BEFORE: string;
  REGISTRATION_NUMBER_CURRENT: string;
  ORIGIN_COUNTRY: string;
  CURRENT_COUNTRY: string;
  TITLE_BEFORE: string;
  TITLE_AFTER: string;
  BREED: string;
  COLOR: string;
  COLOR_CODE: string;
  BIRTH_DATE: string;
  GENDER: string;
  CHIP: string;
  NOTE: string;
  AWARDS: string;
  HEALTH_STATUS: string;
  CATTERY: string;
  MOTHER_ID: string;
  FATHER_ID: string;
  MOTHER_NAME: string;
  FATHER_NAME: string;
  MOTHER_CATTERY: string;
  FATHER_CATTERY: string;
  MOTHER_REG_NUMBER: string;
  FATHER_REG_NUMBER: string;
}

export interface Results {
  top10: Top10[];
  allDuplicates: AllDuplicates[];
  finalCat: AllDuplicates[];
  finalDB: string;
}
