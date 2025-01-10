import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ReceiptsModule } from './receipts/receipts.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ReceiptsModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
