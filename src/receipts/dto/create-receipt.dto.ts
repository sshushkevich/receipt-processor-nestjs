import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ReceiptItemDto } from './receipt-item.dto';
import { Type } from 'class-transformer';

export class CreateReceiptDto {
  @IsNotEmpty()
  retailer: string;

  @IsNotEmpty()
  @IsDateString()
  purchaseDate: string;

  @IsNotEmpty()
  purchaseTime: string;

  @IsDefined()
  total: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ReceiptItemDto)
  items: ReceiptItemDto[];
}
