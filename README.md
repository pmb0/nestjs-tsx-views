<div align="center">
  <h1>nestjs-tsx-views</h1>
  <a href="https://www.npmjs.com/package/nestjs-tsx-views">
    <img src="https://badge.fury.io/js/nestjs-tsx-views.svg">
  </a>
  <a href="https://coveralls.io/r/pmb0/nestjs-tsx-views?branch=master">
    <img src="https://img.shields.io/coveralls/pmb0/nestjs-tsx-views/master.svg">
  </a>
  <a href="https://github.com/pmb0/nestjs-tsx-views/actions?query=workflow%3ATests">
    <img src="https://github.com/pmb0/nestjs-tsx-views/workflows/Tests/badge.svg">
  </a>
  <p>
    React SSR module for <a href="https://docs.nestjs.com/techniques/mvc">NestJS MVC</a>
  </p>
</div>

# Example

Controller:

```ts
import { Controller, Get, Render } from "@nestjs/common";
import { MyViewProps } from "./views/my-view";

@Controller()
export class AppController {
  @Get()
  @Render("my-view")
  index(): MyViewProps {
    return { name: "world" };
  }
}
```

`views/my-view.tsx`:

```tsx
import React, { ReactElement } from "react";
import { MainLayout } from "./layouts/main";

export interface MyViewProps {
  name: string;
  title: string;
}

const MyView = ({ name, ...props }: MyViewProps): ReactElement => (
  <div>Hello {name}</div>
);

export default MyView;
```

# Highlights <!-- omit in toc -->

- Fast, since the JSX/TSX files do not have to be transpiled on-the-fly with every request
- Separate NestJS modules can use their own views directories (see [multi module example](https://github.com/pmb0/nestjs-tsx-views/blob/master/example/multiple-modules))
- Works with compiled files (`.js` / `node`) and uncompiled files (`.tsx` / `ts-node`, `ts-jest`, ...)
- Supports execution of GraphQL queries from JSX components

# Table of contents <!-- omit in toc -->

- [Example](#example)
- [Usage](#usage)
  - [Synchronous configuration](#synchronous-configuration)
  - [Asynchronous configuration](#asynchronous-configuration)
  - [GraphQL](#graphql)
  - [Configuration](#configuration)
- [License](#license)

# Usage

```sh
$ npm install --save nestjs-tsx-views
```

Import the module with `TsxViewsModule.register(...)` or `TsxViewsModule.registerAsync(...)`.

## Synchronous configuration

Use `TsxViewsModule.register()`. Available options are described in the [TsxViewsModuleOptions interface](#configuration).

```ts
@Module({
  imports: [
    TsxViewsModule.register({
      viewsDirectory: resolve(__dirname, "./views"),
      prettify: true,
      forRoutes: [AppController],
    }),
  ],
})
export class MyModule {}
```

## Asynchronous configuration

If you want to use retrieve you [TSX views options](#configuration) dynamically, use `TsxViewsModule.registerAsync()`. Use `useFactory` and `inject` to import your dependencies. Example using the `ConfigService`:

```ts
@Module({
  imports: [
    TsxViewsModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        viewsDirectory: resolve(__dirname, './views'),
        prettify: config.get('PRETTIFY_HTML'
        )
        forRoutes: [AppController],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MyModule {}
```

## GraphQL

This module supports the execution of GraphQL queries from the TSX template. For this purpose `graphql`, `@apollo/client` and `cross-fetch` have to be installed separately:

```sh
$ npm install --save @apollo/client cross-fetch graphql
```

See `example/graphql/app.module.ts` for a working example of how to configure the NestJS module. View example:

```ts
// example/graphql/views/my-view.tsx

export interface Film {
  id: string;
  title: string;
  releaseDate: string;
}

export interface AllFilms {
  allFilms: {
    films: Film[];
  };
}

const MY_QUERY = gql`
  query AllFilms {
    allFilms {
      films {
        id
        title
        releaseDate
      }
    }
  }
`;

export interface MyViewProps {
  name: string;
  title: string;
}

const MyView = (props: MyViewProps): ReactElement => {
  const { data, error } = useQuery<AllFilms>(MY_QUERY);

  if (error) {
    throw error;
  }

  return (
    <MainLayout {...props}>
      <h2>Films:</h2>
      {data?.allFilms.films.map((film) => (
        <ul key={film.id}>
          {film.title} ({new Date(film.releaseDate).getFullYear()})
        </ul>
      ))}
    </MainLayout>
  );
};

export default MyView;
```

## Configuration

nestjs-tsx-views can be configured with the following options:

```ts
export interface TsxViewsModuleOptions extends ReactViewsOptions {
  /**
   * The directory where your views (`.tsx` files) are stored. Must be
   * specified.
   */
  viewsDirectory: string;

  /**
   * [Doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) to
   * be used. */
  doctype?: string;

  /**
   * If activated, the generated HTML string is formatted using
   * [prettier](https://github.com/prettier/prettier)
   */
  prettify?: boolean;

  /**
   * With this optional function the rendered HTML document can be modified. For
   * this purpose a function must be defined which gets the HTML `string` as
   * argument. The function returns a modified version of the HTML string as
   * `string`.
   */
  transform?: (html: string) => string | Promise<string>;

  /**
   * Excludes routes from the currently processed middleware.
   *
   * @param {(string | RouteInfo)[]} routes
   * @returns {MiddlewareConfigProxy}
   */
  exclude?: (string | RouteInfo)[];

  /**
   * Attaches passed either routes or controllers to the currently configured middleware.
   * If you pass a class, Nest would attach middleware to every path defined within this controller.
   *
   * @param {(string | Type | RouteInfo)[]} routes
   * @returns {MiddlewareConsumer}
   */
  forRoutes?: (string | Type<Controller> | RouteInfo)[];
}
```

# License

nestjs-tsx-views is distributed under the MIT license. [See LICENSE](./LICENSE) for details.
