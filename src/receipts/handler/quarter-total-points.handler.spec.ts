import { Test, TestingModule } from '@nestjs/testing';
import { Receipt } from '../interfaces/receipt.interface';
import { QuarterTotalPointsHandler } from './quarter-total-points.handler';

describe('QuarterTotalPointsHandler', () => {
  let handler: QuarterTotalPointsHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuarterTotalPointsHandler],
    }).compile();

    handler = module.get<QuarterTotalPointsHandler>(QuarterTotalPointsHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it.each([
    [35.35, 0],
    [9.0, 25],
    [9.25, 25],
    [9.5, 25],
    [9.75, 25],
    [9.8, 0],
  ])(
    'should calculate points based on retailer name',
    (total, expectedPoints) => {
      const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: new Date(),
        purchaseTime: '11:34',
        total,
        items: [{ shortDescription: 'desc', price: 33.45 }],
      };

      expect(handler.calculatePoints(receipt)).toBe(expectedPoints);
    },
  );
});
