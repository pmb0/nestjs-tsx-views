import { Controller, Get, Render } from '@nestjs/common'
import { MyViewProps } from './views/my-view'

@Controller()
export class AppController {
  @Get()
  @Render('my-view')
  index(): MyViewProps {
    return { title: 'my title', name: 'world' }
  }

  /**
   * This route is excluded in AppModule setup
   */
  @Get('/throws-exception')
  @Render('my-view')
  throwException(): MyViewProps {
    return { title: 'my title', name: 'world' }
  }
}
