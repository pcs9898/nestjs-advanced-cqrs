import { SetMetadata } from '@nestjs/common';

export const GetIp = (...args: string[]) => SetMetadata('get-ip', args);
