import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button/Button'
import Carousel from '../../components/Carousel/Carousel'
import Film from '../../components/Film/Film'
import Spinner from '../../components/Spinner/Spinner'
import { useGetMovieReccomendationsQuery, useGetUserByIdQuery } from '../../store/apiSlices/userApiSlice'
import { selectActualUser } from '../../store/slices/authSlice'
import PredictedBlock from '../PredictedBlock/PredictedBlock'
import s from './Profile.module.css'

const Profile = () => {
  const navigate = useNavigate()
  const user = useSelector(selectActualUser)
  const [isShownPrediction, setIsShownPrediction] = useState(false)

  const { data, isError, isLoading } = useGetUserByIdQuery(user.id)
  const {
    data: predictedBlocksData,
    isError: isPredictedError,
    isLoading: isPredictedLoading,
  } = useGetMovieReccomendationsQuery(user.id)

  let renderedFilms,
    predictedBlocks = ''

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <div>Error</div>
  } else {
    renderedFilms = data.ratings.map((film) => (
      <Film key={film.movie_id} movieId={film.movie_id} movieRating={film.movie_rating} />
    ))
  }

  if (isPredictedLoading) {
    predictedBlocks = 'Loading...'
  } else if (isPredictedError) {
    predictedBlocks = 'Error'
  } else {
    console.log(predictedBlocksData)
    predictedBlocks = predictedBlocksData.map((film) => <PredictedBlock predictedData={film} />)
  }
  console.log(predictedBlocks, isShownPrediction)
  return (
    <div className={s.Profile}>
      <div className={s.filmsTitle}>Profile</div>
      <div className={s.profileName}>
        Name: {user.name} {user.surname}
      </div>
      <div className={s.profileName}>Email: {user.email}</div>
      <div className={s.filmsTitle}>Rated films: </div>
      <div className={s.buttonContainer}>
        <Button
          onClick={() => {
            navigate('/rated-films')
          }}
        >
          Show all rated films
        </Button>
      </div>
      <Carousel>{renderedFilms}</Carousel>
      <div className={s.buttonContainer}>
        <Button
          onClick={() => {
            setIsShownPrediction((state) => !state)
          }}
        >
          {isShownPrediction ? 'Hide recommended films' : 'Show recommended films'}
        </Button>
      </div>
      <div className={s.predictedBlock}>
        {isShownPrediction ? (
          predictedBlocksData?.length > 0 ? (
            <Carousel>{predictedBlocks}</Carousel>
          ) : (
            'No recommended films'
          )
        ) : null}
      </div>
    </div>
  )
}

export default Profile
