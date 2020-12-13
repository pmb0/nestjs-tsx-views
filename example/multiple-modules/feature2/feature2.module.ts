import { Module } from '@nestjs/common'
import { resolve } from 'path'
import { TsxViewsModule } from '../../../src/tsx-views.module'
import { Feature2Controller } from './feature2.controller'

@Module({
  imports: [
    TsxViewsModule.register({
      viewsDirectory: resolve(__dirname, './views'),
      forRoutes: [Feature2Controller],
    }),
  ],
  controllers: [Feature2Controller],
})
export class Feature2Module {}
