import { Test, TestingModule } from '@nestjs/testing';
import { Receipt } from '../interfaces/receipt.interface';
import { RoundTotalPointsHandler } from './round-total-points.handler';

describe('RoundTotalPointsHandler', () => {
  let handler: RoundTotalPointsHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundTotalPointsHandler],
    }).compile();

    handler = module.get<RoundTotalPointsHandler>(RoundTotalPointsHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it.each([
    [35.35, 0],
    [9.0, 50],
  ])(
    'should calculate points based on total value',
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
