import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { NotFoundException } from '@nestjs/common';

describe('ReceiptsController', () => {
  let controller: ReceiptsController;

  const mockReceiptService = {
    create: jest.fn(),
    findOne: jest.fn(),
    calculatePoints: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptsController],
      providers: [
        {
          provide: ReceiptsService,
          useValue: mockReceiptService,
        },
      ],
    }).compile();

    controller = module.get<ReceiptsController>(ReceiptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /receipts/process', () => {
    it('should call receiptsService.create and return the receipt ID', async () => {
      const createReceiptDto: CreateReceiptDto = {
        retailer: 'Target',
        purchaseDate: '2025-01-09',
        purchaseTime: '11:34',
        total: 33.45,
        items: [],
      };
      const mockReceipt = { _id: '677d9950c15021d9b95f23d7' };
      mockReceiptService.create.mockResolvedValue(mockReceipt);

      const result = await controller.process(createReceiptDto);

      expect(result).toEqual({ id: mockReceipt._id });
      expect(mockReceiptService.create).toHaveBeenCalledWith(createReceiptDto);
    });
  });

  describe('GET /receipts/:id/points', () => {
    it('should return the points of a receipt', async () => {
      const id = '677d9950c15021d9b95f23d7';
      const mockReceipt = { _id: id };
      const mockPoints = 100;
      mockReceiptService.findOne.mockResolvedValue(mockReceipt);
      mockReceiptService.calculatePoints.mockReturnValue(mockPoints);

      const result = await controller.findOne(id);

      expect(result).toEqual({ points: mockPoints });
      expect(mockReceiptService.findOne).toHaveBeenCalledWith(id);
      expect(mockReceiptService.calculatePoints).toHaveBeenCalledWith(
        mockReceipt,
      );
    });

    it('should throw NotFoundException if receipt is not found', async () => {
      mockReceiptService.findOne.mockResolvedValue(null);

      await expect(controller.findOne('non-existing-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockReceiptService.findOne).toHaveBeenCalledWith(
        'non-existing-id',
      );
    });
  });
});
