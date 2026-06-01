import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    appService = app.get<AppService>(AppService);
  });

  it('should bootstrap the app module', () => {
    expect(app).toBeDefined();
  });

  it('should resolve AppService with expected response', () => {
    expect(appService.getHello()).toBe('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});
