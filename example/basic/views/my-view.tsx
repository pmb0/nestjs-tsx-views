import React, { ReactElement, useContext } from 'react'
import { MainLayout } from './layouts/main'
import { MyContext } from './my-context'

export interface MyViewProps {
  name: string
  title: string
}

const MyView = ({ name, ...props }: MyViewProps): ReactElement => {
  const myContext = useContext(MyContext)
  return (
    <MainLayout {...props}>
      <div>Hello {name}</div>
      <div>Hello context: {myContext?.name}</div>
    </MainLayout>
  )
}

export default MyView
