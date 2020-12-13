import { ModuleMetadata, Provider, Type } from '@nestjs/common'
import { Controller, RouteInfo } from '@nestjs/common/interfaces'
import { ReactViewsOptions } from 'express-tsx-views'

export interface TsxViewsModuleOptions extends ReactViewsOptions {
  /**
   * Excludes routes from the currently processed middleware.
   *
   * @param {(string | RouteInfo)[]} routes
   * @returns {MiddlewareConfigProxy}
   */
  exclude?: (string | RouteInfo)[]

  /**
   * Attaches passed either routes or controllers to the currently configured middleware.
   * If you pass a class, Nest would attach middleware to every path defined within this controller.
   *
   * @param {(string | Type | RouteInfo)[]} routes
   * @returns {MiddlewareConsumer}
   */
  forRoutes?: (string | Type<Controller> | RouteInfo)[]
}

export interface TsxViewsModuleOptionsFactory {
  createTsxViewsOptions():
    | Promise<TsxViewsModuleOptions>
    | TsxViewsModuleOptions
}

export interface TsxViewsModuleOptionsAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  extraProviders?: Provider[]
  inject?: any[]
  useExisting?: Type<TsxViewsModuleOptionsFactory>
  useClass?: Type<TsxViewsModuleOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<TsxViewsModuleOptions> | TsxViewsModuleOptions
}
