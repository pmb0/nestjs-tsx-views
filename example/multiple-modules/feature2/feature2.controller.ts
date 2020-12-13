import { Controller, Get, Render } from '@nestjs/common'
import { MyViewProps } from './views/my-view'

@Controller('feature2')
export class Feature2Controller {
  @Get()
  @Render('my-view')
  index(): MyViewProps {
    return { name: 'Feature 2' }
  }
}
