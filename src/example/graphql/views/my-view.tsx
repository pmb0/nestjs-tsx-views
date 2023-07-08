import { gql } from '@apollo/client/core/index.js'
import { useQuery } from '@apollo/client/react/hooks/index.js'
import React, { ReactElement } from 'react'
import { MainLayout } from './layouts/main.js'

export interface Film {
  id: string
  title: string
  releaseDate: string
}

export interface AllFilms {
  allFilms: {
    films: Film[]
  }
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
`

export interface MyViewProps {
  name: string
  title: string
}

const MyView = (props: MyViewProps): ReactElement => {
  const { data, error } = useQuery<AllFilms>(MY_QUERY)

  if (error) {
    throw error
  }

  return (
    <MainLayout {...props}>
      <h2>Films:</h2>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {data?.allFilms.films.map((film) => (
        <ul key={film.id}>
          {film.title} ({new Date(film.releaseDate).getFullYear()})
        </ul>
      ))}
    </MainLayout>
  )
}

export default MyView
