import { Injectable } from '@nestjs/common';
import { PointCalculator } from '../interfaces/points-calculator.interface';
import { Receipt } from '../interfaces/receipt.interface';

// Rule:
// One point for every alphanumeric character in the retailer name.
@Injectable()
export class RetailerPointsHandler implements PointCalculator {
  calculatePoints(receipt: Receipt): number {
    return receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
  }
}
