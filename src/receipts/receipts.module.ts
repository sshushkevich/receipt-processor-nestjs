import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { receiptsProviders } from './receipts.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService, ...receiptsProviders],
})
export class ReceiptsModule {}
