import React, { ReactElement } from 'react'

export interface MyViewProps {
  name: string
}

const MyView = (): ReactElement => (
  <div>
    <h1>Feature1</h1>
    <p>With prettified output</p>
  </div>
)

export default MyView
