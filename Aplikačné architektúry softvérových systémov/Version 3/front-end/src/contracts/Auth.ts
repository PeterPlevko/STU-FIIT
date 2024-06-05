import { Breed } from './Cat';

export interface ApiToken {
  type: 'bearer';
  token: string;
  expires_at?: string;
  expires_in?: number;
}

export interface RegisterData {
  email: string;
  fullname: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  //remember: boolean;
}

export interface User {
  id: number;
  fullname: string;
  verified: boolean;
  email: string;
  role: Role;
  breeds: Breed[];
}

export interface Role {
  id: number;
  name: string;
}
