import { Receipt } from './receipt.interface';

export interface PointCalculator {
  calculatePoints(receipt: Receipt): number;
}
