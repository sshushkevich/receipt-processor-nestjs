import { Injectable } from '@nestjs/common';
import { PointCalculator } from '../interfaces/points-calculator.interface';
import { Receipt } from '../interfaces/receipt.interface';

// Rule:
// 5 points for every two items on the receipt.
@Injectable()
export class TwoItemsPointsHandler implements PointCalculator {
  calculatePoints(receipt: Receipt): number {
    return Math.floor(receipt.items.length / 2) * 5;
  }
}
