import { Document } from 'mongoose';
import { Receipt } from './receipt.interface';

export interface ReceiptDocument extends Receipt, Document {}
