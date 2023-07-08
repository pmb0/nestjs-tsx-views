import React, { ReactElement } from 'react'

export interface MyViewProps {
  name: string
}

const MyView = (): ReactElement => (
  <div>
    <h1>Feature2</h1>
    <p>With minified output</p>
  </div>
)

export default MyView
