import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiLoginResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      schema: {
        allOf: [
          {
            properties: {
              accessToken: {
                type: 'string',
              },
            },
          },
        ],
      },
    }),
  );
};
