import { Document } from 'mongoose';

export interface Receipt extends Document {
  retailer: string;
  purchaseDate: Date;
  purchaseTime: string;
  total: number;
  items: { shortDescription: string; price: number }[];
}
