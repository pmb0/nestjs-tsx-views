import { Module } from '@nestjs/common'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { TsxViewsModule } from '../../../index.js'
import { Feature2Controller } from './feature2.controller.js'

const dirname = fileURLToPath(new URL('.', import.meta.url))

@Module({
  imports: [
    TsxViewsModule.register({
      viewsDirectory: resolve(dirname, './views'),
      forRoutes: [Feature2Controller],
    }),
  ],
  controllers: [Feature2Controller],
})
export class Feature2Module {}
