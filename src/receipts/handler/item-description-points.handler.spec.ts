import { Test, TestingModule } from '@nestjs/testing';
import { Receipt } from '../interfaces/receipt.interface';
import { ItemDescriptionPointsHandler } from './item-description-points.handler';

describe('ItemDescriptionPointsHandler', () => {
  let handler: ItemDescriptionPointsHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemDescriptionPointsHandler],
    }).compile();

    handler = module.get<ItemDescriptionPointsHandler>(
      ItemDescriptionPointsHandler,
    );
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it.each([
    ['Mountain Dew 12PK', 6.49, 0],
    ['Emils Cheese Pizza', 12.25, 3],
    ['   Klarbrunn 12-PK 12 FL OZ  ', 12.0, 3],
  ])(
    'should calculate points based on items description and price',
    (shortDescription, price, expectedPoints) => {
      const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: new Date(),
        purchaseTime: '11:34',
        total: price,
        items: [{ shortDescription, price }],
      };

      expect(handler.calculatePoints(receipt)).toBe(expectedPoints);
    },
  );
});
