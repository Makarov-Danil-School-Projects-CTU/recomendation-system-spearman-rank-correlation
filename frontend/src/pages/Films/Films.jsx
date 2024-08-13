import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button/Button'
import Carousel from '../../components/Carousel/Carousel'
import Film from '../../components/Film/Film'
import lowerWave from '../../res/pics/lowerWave.png'
import { useFetchMoviesQuery } from '../../store/apiSlices/movieApiSlice'
import { useGetUserByIdQuery } from '../../store/apiSlices/userApiSlice'
import { selectActualUser } from '../../store/slices/authSlice'
import s from './Films.module.css'
import Spinner from '../../components/Spinner/Spinner'

const Films = () => {
  const navigator = useNavigate()
  const user = useSelector(selectActualUser)
  const { data: userData, isError: userError, isLoading: userLoading } = useGetUserByIdQuery(user.id)
  const { data, isError, isLoading } = useFetchMoviesQuery(user.id)

  let renderedFilms

  if (isLoading || userLoading) {
    renderedFilms = <Spinner />
  } else if (isError || userError) {
    renderedFilms = <div>'Error'</div>
  } else {
    const ratedFilms = userData.ratings.map((film) => film.movie_id)
    const unratedFilms = data.filter((film) => !ratedFilms.includes(film.id))
    renderedFilms = unratedFilms.map((film) => <Film key={film.id} movieId={film.id} movieRating={0} />)
  }

  return (
    <>
      <div className={s.Films}>
        <div className={s.filmsTitle}>Unrated films</div>
        {!!renderedFilms.length && <Carousel>{renderedFilms}</Carousel>}
        <div className={s.showAllButton}>
          <Button
            onClick={() => {
              navigator('/unrated-films')
            }}
          >
            Show all unrated films
          </Button>
        </div>
      </div>
      <div className={s.lowerWave}>
        <img src={lowerWave} alt='Wave' />
      </div>
    </>
  )
}

export default Films
