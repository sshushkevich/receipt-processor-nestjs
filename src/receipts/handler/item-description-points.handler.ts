import { Injectable } from '@nestjs/common';
import { PointCalculator } from '../interfaces/points-calculator.interface';
import { Receipt } from '../interfaces/receipt.interface';

// Rule:
// If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer.
// The result is the number of points earned.
@Injectable()
export class ItemDescriptionPointsHandler implements PointCalculator {
  calculatePoints(receipt: Receipt): number {
    return receipt.items
      .map((it) =>
        it.shortDescription.trim().length % 3 === 0
          ? Math.ceil(it.price * 0.2)
          : 0,
      )
      .reduce((sum, v) => sum + v, 0);
  }
}
