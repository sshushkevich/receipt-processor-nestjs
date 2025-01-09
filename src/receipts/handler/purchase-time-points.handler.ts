import { Injectable } from '@nestjs/common';
import { PointCalculator } from '../interfaces/points-calculator.interface';
import { Receipt } from '../interfaces/receipt.interface';

// Rule:
// 10 points if the time of purchase is after 2:00pm and before 4:00pm.
@Injectable()
export class PurchaseTimePointsHandler implements PointCalculator {
  calculatePoints(receipt: Receipt): number {
    const hour = parseInt(receipt.purchaseTime.split(':')[0]);
    return hour >= 14 && hour < 16 ? 10 : 0;
  }
}
