import { Module } from '@nestjs/common'
import { resolve } from 'path'
import { TsxViewsModule } from '../../src'
import { AppController } from './app.controller'

@Module({
  imports: [
    TsxViewsModule.registerAsync({
      useFactory: () => ({
        viewsDirectory: resolve(__dirname, './views'),
        prettify: true,
        exclude: ['/throws-exception'],
        forRoutes: [AppController],
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
