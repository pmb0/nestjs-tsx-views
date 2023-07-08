import React, { ReactElement, ReactNode } from 'react'

export interface MainLayoutProps {
  title: string
  children: ReactNode
}

export const MainLayout = ({
  title,
  children,
}: MainLayoutProps): ReactElement => (
  <html>
    <head>
      <title>{title}</title>
    </head>
    <body>
      <h1>{title}</h1>
      {children}
    </body>
  </html>
)
