import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return ok status', () => {
      const res = appController.status();
      expect(res).toHaveProperty('status', 'ok');
      expect(res).toHaveProperty('timestamp');
      expect(new Date(res.timestamp).getTime()).toBeGreaterThan(0);
    });
  });
});
