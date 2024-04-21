import { SetMetadata } from '@nestjs/common';

export const IsLength = (...args: string[]) => SetMetadata('is-length', args);
