import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { setupReactViews } from 'express-tsx-views'
import { TSX_VIEWS_OPTIONS } from './tsx-views.constants'
import { TsxViewsModuleOptions } from './tsx-views.interface'

@Injectable()
export class TsxViewsMiddleware implements NestMiddleware {
  constructor(
    @Inject(TSX_VIEWS_OPTIONS) private readonly options: TsxViewsModuleOptions,
  ) {}

  use(req: Request, _res: Response, next: () => void): void {
    setupReactViews(req.app, this.options)

    next()
  }
}
