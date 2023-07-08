import { Module } from '@nestjs/common'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { TsxViewsModule } from '../../index.js'
import { AppController } from './app.controller.js'

const dirname = fileURLToPath(new URL('.', import.meta.url))

@Module({
  imports: [
    TsxViewsModule.registerAsync({
      useFactory: () => ({
        viewsDirectory: resolve(dirname, './views'),
        prettify: true,
        exclude: ['/throws-exception'],
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
