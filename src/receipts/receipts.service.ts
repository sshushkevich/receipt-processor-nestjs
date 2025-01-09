import { Inject, Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { Model } from 'mongoose';
import { PointCalculator } from './interfaces/points-calculator.interface';
import { ReceiptDocument } from './interfaces/receipt-document.interface';
import { POINTS_CALC_HANDLERS, RECEIPT_MODEL } from '../common/constants';

@Injectable()
export class ReceiptsService {
  constructor(
    @Inject(RECEIPT_MODEL)
    private readonly receiptModel: Model<ReceiptDocument>,
    @Inject(POINTS_CALC_HANDLERS)
    private readonly pointsCalculators: PointCalculator[],
  ) {}

  async create(createReceiptDto: CreateReceiptDto) {
    return new this.receiptModel(createReceiptDto).save();
  }

  async findOne(id: string) {
    return this.receiptModel.findById(id).exec();
  }

  calculatePoints(receipt: ReceiptDocument): number {
    return this.pointsCalculators.reduce(
      (total, calculator) => total + calculator.calculatePoints(receipt),
      0,
    );
  }
}
