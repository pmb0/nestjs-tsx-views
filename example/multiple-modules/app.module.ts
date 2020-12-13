import { Module } from '@nestjs/common'
import { Feature1Module } from './feature1/feature1.module'
import { Feature2Module } from './feature2/feature2.module'

@Module({
  imports: [Feature1Module, Feature2Module],
})
export class AppModule {}
