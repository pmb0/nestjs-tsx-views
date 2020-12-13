import { Controller, Get, Render } from '@nestjs/common'
import { MyViewProps } from './views/my-view'

@Controller('feature1')
export class Feature1Controller {
  @Get()
  @Render('my-view')
  index(): MyViewProps {
    return { name: 'Feature 1' }
  }
}
