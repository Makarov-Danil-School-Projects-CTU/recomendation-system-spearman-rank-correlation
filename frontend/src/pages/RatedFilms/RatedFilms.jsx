import { useSelector } from 'react-redux'

import Film from '../../components/Film/Film'
import Spinner from '../../components/Spinner/Spinner'
import lowerWave from '../../res/pics/lowerWave.png'
import { useGetUserByIdQuery } from '../../store/apiSlices/userApiSlice'
import { selectActualUser } from '../../store/slices/authSlice'
import s from './RatedFilms.module.css'

const RatedFilms = () => {
  const user = useSelector(selectActualUser)
  const { data, isError, isLoading } = useGetUserByIdQuery(user.id)

  let renderedFilms
  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <div>Error</div>
  } else {
    renderedFilms = data.ratings.map((film) => (
      <Film key={film.movie_id} movieId={film.movie_id} movieRating={film.movie_rating} />
    ))
  }

  return (
    <>
      <div className={s.AllFilms}>
        <div className={s.title}></div>
        <div className={s.filmContainer}>{renderedFilms}</div>
      </div>
      <div className={s.lowerWave}>
        <img src={lowerWave} alt='Wave' />
      </div>
    </>
  )
}

export default RatedFilms
