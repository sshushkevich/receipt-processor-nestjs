import { Connection } from 'mongoose';
import { ReceiptSchema } from './schemas/receipt.schema';
import {
  DB_CONNECTION,
  POINTS_CALC_HANDLERS,
  RECEIPT_MODEL,
} from 'src/common/constants';
import { RetailerPointsHandler } from './handler/retailer-points.handler';
import { PointCalculator } from './interfaces/points-calculator.interface';
import { QuarterTotalPointsHandler } from './handler/quarter-total-points.handler';

export const receiptsProviders = [
  RetailerPointsHandler,
  QuarterTotalPointsHandler,
  {
    provide: RECEIPT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Receipt', ReceiptSchema),
    inject: [DB_CONNECTION],
  },
  {
    provide: POINTS_CALC_HANDLERS,
    useFactory: (
      h1: RetailerPointsHandler,
      h2: QuarterTotalPointsHandler,
    ): PointCalculator[] => [h1, h2],
    inject: [RetailerPointsHandler, QuarterTotalPointsHandler],
  },
];
