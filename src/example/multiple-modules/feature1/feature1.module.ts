import { Module } from '@nestjs/common'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { TsxViewsModule } from '../../../tsx-views.module.js'
import { Feature1Controller } from './feature1.controller.js'

const dirname = fileURLToPath(new URL('.', import.meta.url))

@Module({
  imports: [
    TsxViewsModule.register({
      viewsDirectory: resolve(dirname, './views'),
      prettify: true,

      forRoutes: [Feature1Controller],
    }),
  ],
  controllers: [Feature1Controller],
})
export class Feature1Module {}
