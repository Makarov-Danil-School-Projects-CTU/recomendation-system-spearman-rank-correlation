import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Button from '../../components/Button/Button'
import Comment from '../../components/Comments/Comment'
import CommentField from '../../components/Comments/CommentField.jsx'
import StableRate from '../../components/Rate/StableRate'
import { useFetchMovieQuery } from '../../store/apiSlices/movieApiSlice'
import { useGetPredictedMovieRatingQuery } from '../../store/apiSlices/userApiSlice'
import { selectActualUser } from '../../store/slices/authSlice'
import s from './FilmDetail.module.css'
import Spinner from '../../components/Spinner/Spinner'

const FilmDetail = () => {
  const [predictedRatingLabel, setPredictedRatingLabel] = useState('Get predicted rating')
  const user = useSelector(selectActualUser)
  const param = useParams()
  const { data, isError, isLoading } = useFetchMovieQuery(param.id)
  const {
    data: predictedRating,
    isError: isPredictedError,
    isLoading: isPredictedLoading,
  } = useGetPredictedMovieRatingQuery({ userID: user.id, movieID: param.id })

  const getRandomColor = () => {
    const colors = ['#C05FD1', '#6A60E0', '#0875AC', '#3C404F', '#415CA2', '#F37090', '#7DDA97']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getRandomName = () => {
    const name = [
      'Horse',
      'Dog',
      'Elephant',
      'Cow',
      'Lion',
      'Rabbit',
      'Chicken',
      'Duck',
      'Goat',
      'Wolf',
      'Frog',
      'Tiger',
    ]
    return name[Math.floor(Math.random() * name.length)]
  }

  let filmCard,
    filmStats,
    filmTitle = ''

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return 'Error while fetching film'
  } else {
    filmTitle = data.title
    filmCard = (
      <div className={s.filmCardColumn}>
        <div className={s.Film}>
          <div className={s.filmImg}></div>
          <div className={s.filmTitle}>{data.title}</div>
          <div className={s.filmRating}>
            <StableRate rating={data.rating} count={5} />
          </div>
        </div>
      </div>
    )

    filmStats = (
      <div className={s.filmStatsColumn}>
        <div className={s.stat}>
          <b>Year: &nbsp;</b>
          {data.year}
        </div>
        <div className={s.stat}>
          <b>Country:&nbsp;</b> {data.country}
        </div>
        <div className={s.stat}>
          <b>Main cast:&nbsp;</b> {data.main_actors}
        </div>
        <div className={s.stat}>
          <b>Category:&nbsp;</b> {data.category}
        </div>
        <div className={s.stat}>{data.description}</div>
      </div>
    )
  }

  if (isPredictedLoading) {
    return <Spinner />
  } else if (isPredictedError) {
    return 'Error while fetching predicted rating'
  }

  const handleShowPredictedRating = () => {
    setPredictedRatingLabel('Loading')
    setTimeout(() => setPredictedRatingLabel(parseFloat(predictedRating.user_predicted_rating).toFixed(3)), 1000)
  }

  return (
    <div className={s.FilmDetail}>
      <div className={s.title}>{filmTitle}</div>
      <div className={s.filmInfoRow}>
        {filmCard}
        {filmStats}
      </div>
      <div className={s.predictButton}>
        <Button onClick={handleShowPredictedRating}>{predictedRatingLabel}</Button>
      </div>
      <div className={s.comments}>
        <CommentField movieId={param.id} />
        <Comment movieId={param.id} getRandomColor={getRandomColor} getRandomName={getRandomName} />
      </div>
    </div>
  )
}

export default FilmDetail
