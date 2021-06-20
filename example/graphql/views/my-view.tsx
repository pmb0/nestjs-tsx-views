import { gql, useQuery } from '@apollo/client'
import React, { ReactElement } from 'react'
import { MainLayout } from './layouts/main'

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
      {data?.allFilms.films.map((film) => (
        <ul key={film.id}>
          {film.title} ({new Date(film.releaseDate).getFullYear()})
        </ul>
      ))}
    </MainLayout>
  )
}

export default MyView
