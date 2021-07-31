import { createContext } from 'react'

export interface MyContextProps {
  name: string
}

export const MyContext = createContext<MyContextProps | undefined>(undefined)
