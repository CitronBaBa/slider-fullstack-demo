import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { BizExceptionFilter, RootExceptionFilter } from './app.exceptionFilter';
import { ComponentModule } from './component/component.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    PrismaModule,
    ComponentModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RootExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BizExceptionFilter,
    },
  ],
})
export class APPModule {}
