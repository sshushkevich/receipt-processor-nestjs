import mongoose from 'mongoose';
import { DB_CONNECTION } from '../common/constants';

export const databaseProviders = [
  {
    provide: DB_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/receipt-processor'),
  },
];
