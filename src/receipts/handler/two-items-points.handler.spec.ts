import { Test, TestingModule } from '@nestjs/testing';
import { Receipt } from '../interfaces/receipt.interface';
import { TwoItemsPointsHandler } from './two-items-points.handler';

describe('TwoItemsPointsHandler', () => {
  let handler: TwoItemsPointsHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwoItemsPointsHandler],
    }).compile();

    handler = module.get<TwoItemsPointsHandler>(TwoItemsPointsHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it.each([
    [1, 0],
    [2, 5],
    [3, 5],
    [4, 10],
    [5, 10],
  ])(
    'should calculate points based on items pairs',
    (itemsCount, expectedPoints) => {
      const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: new Date(),
        purchaseTime: '11:34',
        total: 33.45,
        items: Array.from({ length: itemsCount }, (el, i) => {
          return { shortDescription: 'desc', price: 33.45 + i };
        }),
      };

      expect(handler.calculatePoints(receipt)).toBe(expectedPoints);
    },
  );
});
