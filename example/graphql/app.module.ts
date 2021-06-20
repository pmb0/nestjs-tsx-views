import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { Module } from '@nestjs/common'
import { fetch } from 'cross-fetch'
import { ApolloRenderMiddleware } from 'express-tsx-views/dist/apollo'
import { resolve } from 'path'
import { TsxViewsModule } from '../../src'
import { AppController } from './app.controller'

@Module({
  imports: [
    TsxViewsModule.registerAsync({
      useFactory: (apollo: ApolloClient<InMemoryCache>) => ({
        viewsDirectory: resolve(__dirname, './views'),
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
