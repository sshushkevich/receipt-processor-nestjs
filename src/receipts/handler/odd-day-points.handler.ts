import { Injectable } from '@nestjs/common';
import { PointCalculator } from '../interfaces/points-calculator.interface';
import { Receipt } from '../interfaces/receipt.interface';

// Rule:
// 6 points if the day in the purchase date is odd.
@Injectable()
export class OddDayPointsHandler implements PointCalculator {
  calculatePoints(receipt: Receipt): number {
    return receipt.purchaseDate.getUTCDate() % 2 !== 0 ? 6 : 0;
  }
}
