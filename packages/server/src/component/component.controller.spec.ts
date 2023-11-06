import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ComponentModule } from './component.module';
import { ComponentService } from './component.service';

describe('ComponentController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ComponentModule],
    })
      .overrideProvider(ComponentService)
      .useValue({
        updateSliderBgImage: jest.fn(), // Mock the service method
      })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('can upload', async () => {
    const fileData = createBufferOfSize(0.1);

    const response = await request
      .default(app.getHttpServer())
      .post('/component/slider/bgUpload')
      .attach('file', fileData, {
        filename: 'test.jpg',
        contentType: 'image/jpeg',
      });
    expect(response.status).toBe(201);
  });

  it('should reject wrong content type', async () => {
    const fileData = createBufferOfSize(0.1);

    const response = await request
      .default(app.getHttpServer())
      .post('/component/slider/bgUpload')
      .attach('file', fileData, {
        filename: 'test.jpg',
        contentType: 'application/json',
      });
    expect(response.status).toBe(400);
  });

  it('should reject file too large', async () => {
    const fileData = createBufferOfSize(30 * 1024);

    const response = await request
      .default(app.getHttpServer())
      .post('/component/slider/bgUpload')
      .attach('file', fileData, {
        filename: 'test.jpg',
        contentType: 'image/jpeg',
      });
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await app.close();
  });
});

function createBufferOfSize(sizeKB: number) {
  const size = Math.ceil(sizeKB * 1024);
  const buffer = Buffer.alloc(size);
  return buffer;
}
