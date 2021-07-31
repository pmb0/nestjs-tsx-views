import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request, Response } from 'express'
import { addReactContext } from 'express-tsx-views'
import { Context } from 'react'

@Injectable({ scope: Scope.REQUEST })
export class TsxViewsService {
  #response: Response

  constructor(@Inject(REQUEST) request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.#response = request.res!
  }

  addContext<T>(context: Context<T>, value: T): void {
    addReactContext(this.#response, context, value)
  }
}
