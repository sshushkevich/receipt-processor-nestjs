import { Connection } from 'mongoose';
import { ReceiptSchema } from './schemas/receipt.schema';
import {
  DB_CONNECTION,
  POINTS_CALC_HANDLERS,
  RECEIPT_MODEL,
} from '../common/constants';
import { RetailerPointsHandler } from './handler/retailer-points.handler';
import { PointCalculator } from './interfaces/points-calculator.interface';
import { QuarterTotalPointsHandler } from './handler/quarter-total-points.handler';
import { ItemDescriptionPointsHandler } from './handler/item-description-points.handler';
import { OddDayPointsHandler } from './handler/odd-day-points.handler';
import { PurchaseTimePointsHandler } from './handler/purchase-time-points.handler';
import { RoundTotalPointsHandler } from './handler/round-total-points.handler';
import { TwoItemsPointsHandler } from './handler/two-items-points.handler';

export const receiptsProviders = [
  RetailerPointsHandler,
  QuarterTotalPointsHandler,
  ItemDescriptionPointsHandler,
  OddDayPointsHandler,
  PurchaseTimePointsHandler,
  RoundTotalPointsHandler,
  TwoItemsPointsHandler,
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
      h3: ItemDescriptionPointsHandler,
      h4: OddDayPointsHandler,
      h5: PurchaseTimePointsHandler,
      h6: RoundTotalPointsHandler,
      h7: TwoItemsPointsHandler,
    ): PointCalculator[] => [h1, h2, h3, h4, h5, h6, h7],
    inject: [
      RetailerPointsHandler,
      QuarterTotalPointsHandler,
      ItemDescriptionPointsHandler,
      OddDayPointsHandler,
      PurchaseTimePointsHandler,
      RoundTotalPointsHandler,
      TwoItemsPointsHandler,
    ],
  },
];
