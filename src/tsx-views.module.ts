import {
  DynamicModule,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common'
import { TSX_VIEWS_OPTIONS } from './tsx-views.constants'
import {
  TsxViewsModuleOptions,
  TsxViewsModuleOptionsAsyncOptions,
  TsxViewsModuleOptionsFactory,
} from './tsx-views.interface'
import { TsxViewsMiddleware } from './tsx-views.middleware'

@Module({})
export class TsxViewsModule implements NestModule {
  constructor(
    @Inject(TSX_VIEWS_OPTIONS) private readonly options: TsxViewsModuleOptions,
  ) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TsxViewsMiddleware)
      .exclude(...(this.options.exclude ?? []))
      .forRoutes(...(this.options.forRoutes ?? '*'))
  }

  public static registerAsync(
    options: TsxViewsModuleOptionsAsyncOptions,
  ): DynamicModule {
    const providers = this.createProviders(options)
    return {
      module: TsxViewsModule,
      imports: options.imports,
      providers: [...(options.extraProviders ?? []), ...providers],
      exports: [...providers],
    }
  }

  static createProviders(
    options: TsxViewsModuleOptionsAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)]
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass!,
        useClass: options.useClass!,
      },
    ]
  }

  private static createOptionsProvider(
    options: TsxViewsModuleOptionsAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: TSX_VIEWS_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject,
      }
    }

    return {
      provide: TSX_VIEWS_OPTIONS,
      useFactory: async (optionsFactory: TsxViewsModuleOptionsFactory) =>
        await optionsFactory.createTsxViewsOptions(),
      inject: [options.useExisting || options.useClass!],
    }
  }
}
