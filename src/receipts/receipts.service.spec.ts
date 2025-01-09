import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptsService } from './receipts.service';
import { POINTS_CALC_HANDLERS, RECEIPT_MODEL } from '../common/constants';

describe('ReceiptsService', () => {
  let service: ReceiptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceiptsService,
        {
          provide: RECEIPT_MODEL,
          useValue: {},
        },
        {
          provide: POINTS_CALC_HANDLERS,
          useValue: [],
        },
      ],
    }).compile();

    service = module.get<ReceiptsService>(ReceiptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
