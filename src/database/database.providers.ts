import mongoose from 'mongoose';
import { DB_CONNECTION } from '../common/constants';

export const databaseProviders = [
  {
    provide: DB_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/receipt-processor'),
  },
];
