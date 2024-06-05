// auth.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let result = false;
    try {
      const authHeader = request.headers.authorization;
      if (authHeader !== 'undefined') {
        result = await getAuth()
          .verifyIdToken(authHeader)
          .then(() => {
            return true;
          })
          .catch((error) => {
            console.log('error', error);
            return false;
          });
      } else {
        return false;
      }
    } catch (error) {
      console.log('error', error);
      return false;
    }
    return result;
  }
}
