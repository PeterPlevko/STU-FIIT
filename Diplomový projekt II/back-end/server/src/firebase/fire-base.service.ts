// firebase.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import serviceAccountKey from './serviceAccountKey';

@Injectable()
export class FirebaseService {
  private readonly admin;

  constructor() {
    this.admin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
    });
  }

  getAdmin() {
    return this.admin;
  }
}
