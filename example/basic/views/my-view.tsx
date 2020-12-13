import React, { ReactElement } from 'react'
import { MainLayout } from './layouts/main'

export interface MyViewProps {
  name: string
  title: string
}

const MyView = ({ name, ...props }: MyViewProps): ReactElement => (
  <MainLayout {...props}>
    <div>Hello {name}</div>
  </MainLayout>
)

export default MyView
