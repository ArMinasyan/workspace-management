import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Language = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.lang || 'am';
  },
);
