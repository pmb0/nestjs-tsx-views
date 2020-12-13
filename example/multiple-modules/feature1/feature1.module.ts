import { Module } from '@nestjs/common'
import { resolve } from 'path'
import { TsxViewsModule } from '../../../src/tsx-views.module'
import { Feature1Controller } from './feature1.controller'

@Module({
  imports: [
    TsxViewsModule.register({
      viewsDirectory: resolve(__dirname, './views'),
      prettify: true,

      forRoutes: [Feature1Controller],
    }),
  ],
  controllers: [Feature1Controller],
})
export class Feature1Module {}
