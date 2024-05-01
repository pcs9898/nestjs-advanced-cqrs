import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

describe('HealthController', () => {
  let healthController: HealthController;
  // let healthCheckService: HealthCheckService;
  // let db: TypeOrmHealthIndicator;
  // let memory: MemoryHealthIndicator;

  const checkResponse: HealthCheckResult = {
    status: 'ok',
    info: {
      database: {
        status: 'up',
      },
      memory_heap: {
        status: 'up',
      },
    },
    error: {},
    details: {
      database: {
        status: 'up',
      },
      memory_heap: {
        status: 'up',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: { check: jest.fn().mockResolvedValue(checkResponse) },
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: { pingCheck: jest.fn() },
        },
        {
          provide: MemoryHealthIndicator,
          useValue: { checkHeap: jest.fn() },
        },
      ],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
    // healthCheckService = module.get<HealthCheckService>(HealthCheckService);
    // db = module.get<TypeOrmHealthIndicator>(TypeOrmHealthIndicator);
    // memory = module.get<MemoryHealthIndicator>(MemoryHealthIndicator);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('check v1', () => {
    it('should return health check result', async () => {
      // give
      const result = checkResponse;

      // when
      const response = await healthController.checkV1();

      // then
      expect(response).toEqual(result);
    });
  });
});
