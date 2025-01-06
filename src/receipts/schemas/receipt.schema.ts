import * as mongoose from 'mongoose';

export const ReceiptSchema = new mongoose.Schema({
  retailer: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  purchaseTime: { type: String, required: true },
  total: { type: Number, required: true },
  items: [
    {
      shortDescription: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});
