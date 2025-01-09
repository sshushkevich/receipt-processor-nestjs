import { Test, TestingModule } from '@nestjs/testing';
import { Receipt } from '../interfaces/receipt.interface';
import { OddDayPointsHandler } from './odd-day-points.handler';

describe('OddDayPointsHandler', () => {
  let handler: OddDayPointsHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OddDayPointsHandler],
    }).compile();

    handler = module.get<OddDayPointsHandler>(OddDayPointsHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it.each([
    ['2022-01-01', 6],
    ['2022-01-02', 0],
    ['2022-01-03', 6],
    ['2022-01-04', 0],
  ])(
    'should calculate points based on purchase date',
    (dateStr, expectedPoints) => {
      const receipt: Receipt = {
        retailer: 'Target',
        purchaseDate: new Date(dateStr),
        purchaseTime: '11:34',
        total: 33.45,
        items: [{ shortDescription: 'desc', price: 33.45 }],
      };

      expect(handler.calculatePoints(receipt)).toBe(expectedPoints);
    },
  );
});
