import { Test, TestingModule } from '@nestjs/testing';
import { Receipt } from '../interfaces/receipt.interface';
import { PurchaseTimePointsHandler } from './purchase-time-points.handler';

describe('PurchaseTimePointsHandler', () => {
  let handler: PurchaseTimePointsHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseTimePointsHandler],
    }).compile();

    handler = module.get<PurchaseTimePointsHandler>(PurchaseTimePointsHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it.each([
    ['11:01', 0],
    ['13:59', 0],
    ['14:00', 10],
    ['14:01', 10],
    ['15:59', 10],
    ['16:00', 0],
  ])(
    'should calculate points based on purchase time',
    (purchaseTime, expectedPoints) => {
      const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: new Date(),
        purchaseTime,
        total: 33.45,
        items: [{ shortDescription: 'desc', price: 33.45 }],
      };

      expect(handler.calculatePoints(receipt)).toBe(expectedPoints);
    },
  );
});
