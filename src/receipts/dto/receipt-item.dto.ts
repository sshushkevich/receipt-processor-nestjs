import { IsDefined, IsNotEmpty } from 'class-validator';

export class ReceiptItemDto {
  @IsNotEmpty()
  shortDescription: string;

  @IsDefined()
  price: number;
}
