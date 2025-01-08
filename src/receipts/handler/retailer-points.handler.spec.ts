import { Test, TestingModule } from '@nestjs/testing';
import { RetailerPointsHandler } from './retailer-points.handler';
import { Receipt } from '../interfaces/receipt.interface';

describe('RetailerPointsHandler', () => {
  let handler: RetailerPointsHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetailerPointsHandler],
    }).compile();

    handler = module.get<RetailerPointsHandler>(RetailerPointsHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it.each([
    ['Target', 6],
    ['Walmart', 7],
    ['Food 4 Less', 9],
  ])(
    'should calculate points based on retailer name',
    (retailer, expectedPoints) => {
      const receipt: Receipt = {
        retailer,
        purchaseDate: new Date(),
        purchaseTime: '11:34',
        total: 33.45,
        items: [{ shortDescription: 'desc', price: 33.45 }],
      };

      expect(handler.calculatePoints(receipt)).toBe(expectedPoints);
    },
  );
});
