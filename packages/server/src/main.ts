import { VersioningType } from '@nestjs/common';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import express from 'express';

import { APPModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APPModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1', // version can also be specified inside controller
  });
  app.use('/uploads', express.static('uploads')); // Serve files from the 'uploads' directory

  const configService = app.get(ConfigService);
  app.enableCors(createCorsHandler(configService));
  await app.listen(configService.get('PORT') || 3000);
}

export const createCorsHandler: (
  configService: ConfigService
) => CorsOptionsDelegate<any> = configService => (req, callback) => {
  let corsOptions: CorsOptions;
  if (
    // TODO: parse the white list properly
    configService.get<string>('CORS_WHITELIST')?.includes(req.header('Origin'))
  ) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null as any, corsOptions); // callback expects two parameters: error and options
};

bootstrap();
