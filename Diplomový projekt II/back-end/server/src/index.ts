import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';

const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  return app.init();
};

createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);

// login part
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

export const AddUserRole = functions.auth.user().onCreate(async (authUser) => {
  if (authUser.email) {
    const customClaims = {
      user: true,
    };
    try {
      await admin.auth().setCustomUserClaims(authUser.uid, customClaims);

      return db.collection('roles').doc(authUser.uid).set({
        email: authUser.email,
        role: customClaims,
      });
    } catch (error) {
      console.log(error);
    }
  }
});

// change role part
export const SetUserRole = functions.https.onCall(async (data, context) => {
  if (!context.auth.token.admin) return;

  try {
    await admin.auth().setCustomUserClaims(data.uid, data.role);

    return db.collection('roles').doc(data.uid).update({
      role: data.role,
    });
  } catch (error) {
    console.log(error);
  }
});
