import { Injectable } from '@nestjs/common';
import { PointCalculator } from '../interfaces/points-calculator.interface';
import { Receipt } from '../interfaces/receipt.interface';

// Rule:
// 25 points if the total is a multiple of 0.25.
@Injectable()
export class QuarterTotalPointsHandler implements PointCalculator {
  calculatePoints(receipt: Receipt): number {
    return receipt.total % 0.25 === 0 ? 25 : 0;
  }
}
