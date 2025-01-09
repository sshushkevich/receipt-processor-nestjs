import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post('process')
  async process(@Body() createReceiptDto: CreateReceiptDto) {
    const receipt = await this.receiptsService.create(createReceiptDto);
    return { id: receipt._id };
  }

  @Get(':id/points')
  async findOne(@Param('id') id: string) {
    const receipt = await this.receiptsService.findOne(id);
    if (!receipt) {
      throw new NotFoundException();
    }

    return { points: this.receiptsService.calculatePoints(receipt) };
  }
}
