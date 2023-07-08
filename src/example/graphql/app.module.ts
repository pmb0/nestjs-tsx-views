import { InMemoryCache } from '@apollo/client/cache/index.js'
import { ApolloClient } from '@apollo/client/core/index.js'
import { createHttpLink } from '@apollo/client/link/http/index.js'
import { Module } from '@nestjs/common'
import { fetch } from 'cross-fetch'
import { ApolloRenderMiddleware } from 'express-tsx-views/dist/apollo.js'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { TsxViewsModule } from '../../index.js'
import { AppController } from './app.controller.js'

const dirname = fileURLToPath(new URL('.', import.meta.url))

@Module({
  imports: [
    TsxViewsModule.registerAsync({
      useFactory: (apollo: ApolloClient<InMemoryCache>) => ({
        viewsDirectory: resolve(dirname, './views'),
        prettify: true,
        exclude: ['/throws-exception'],
        forRoutes: [AppController],
        middlewares: [new ApolloRenderMiddleware(apollo)],
      }),
      inject: [ApolloClient],
      extraProviders: [
        {
          provide: ApolloClient,
          useValue: new ApolloClient({
            ssrMode: true,
            link: createHttpLink({
              uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
              fetch,
            }),
            cache: new InMemoryCache(),
          }),
        },
      ],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
