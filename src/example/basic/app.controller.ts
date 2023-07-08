import { Controller, Get, Render } from '@nestjs/common'
import { TsxViewsService } from '../../index.js'
import { MyContext } from './views/my-context.js'
import { MyViewProps } from './views/my-view.js'

@Controller()
export class AppController {
  #ssr: TsxViewsService

  constructor(ssr: TsxViewsService) {
    this.#ssr = ssr
  }

  @Get()
  @Render('my-view')
  index(): MyViewProps {
    this.#ssr.addContext(MyContext, { name: 'My context data' })

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
