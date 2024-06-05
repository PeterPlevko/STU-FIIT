import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiUpdateUserResponse = () => {
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
