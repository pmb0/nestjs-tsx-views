import { Request, Response } from 'express'
import { setupReactViews } from 'express-tsx-views'
import { TsxViewsMiddleware } from './tsx-views.middleware'

jest.mock('express-tsx-views', () => ({ setupReactViews: jest.fn() }))

describe('TsxViewsMiddleware', () => {
  let tsxViewsMiddleware: TsxViewsMiddleware

  beforeEach(() => {
    tsxViewsMiddleware = new TsxViewsMiddleware({ viewsDirectory: '/tmp' })
  })

  test('use', () => {
    const next = jest.fn()
    const request = { app: {} } as Request
    const response = {} as Response

    tsxViewsMiddleware.use(request, response, next)
    expect(setupReactViews).toHaveBeenCalledWith({}, { viewsDirectory: '/tmp' })
  })
})
