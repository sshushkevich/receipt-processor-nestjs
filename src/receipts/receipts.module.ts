import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { DatabaseModule } from '../database/database.module';
import { receiptsProviders } from './receipts.providers';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({ ttl: 60000 }), DatabaseModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService, ...receiptsProviders],
})
export class ReceiptsModule {}
