import { Injectable } from '@nestjs/common';
import { PointCalculator } from '../interfaces/points-calculator.interface';
import { Receipt } from '../interfaces/receipt.interface';

// Rule:
// 50 points if the total is a round dollar amount with no cents.
@Injectable()
export class RoundTotalPointsHandler implements PointCalculator {
  calculatePoints(receipt: Receipt): number {
    return receipt.total % 1 === 0 ? 50 : 0;
  }
}
