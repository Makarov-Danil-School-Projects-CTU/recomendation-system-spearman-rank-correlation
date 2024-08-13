import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAddMovieRateMutation, useFetchMovieQuery } from '../../store/apiSlices/movieApiSlice'
import { selectActualUser } from '../../store/slices/authSlice'
import Rate from '../Rate/Rate'
import s from './Film.module.css'
import Spinner from '../Spinner/Spinner'

const Film = ({ movieId, movieRating }) => {
  const user = useSelector(selectActualUser)
  const navigate = useNavigate()
  const { data, isError, isLoading } = useFetchMovieQuery(movieId)
  const [changeRating] = useAddMovieRateMutation()

  const getNormalName = (title) => {
    if (title.length >= 70) {
      return title.slice(0, 67) + '...'
    }
    return title
  }

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return 'Error'
  } else {
    return (
      <div className={s.Film}>
        <div className={s.filmImg}>
          
        </div>
        <div
          className={s.filmTitle}
          onClick={() => {
            navigate(`/films/${movieId}`)
          }}
        >
          {getNormalName(data.title)}
        </div>
        <div className={s.filmRating}>
          <Rate
            rating={movieRating}
            count={5}
            onRating={(rate) => {
              changeRating({ user_id: user.id, user_rating: rate, movie_id: movieId })
            }}
            movieRating={movieRating}
          />
        </div>
      </div>
    )
  }
}

export default Film
