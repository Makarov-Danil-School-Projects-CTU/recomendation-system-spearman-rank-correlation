import { useSelector } from "react-redux"

import Film from "../../components/Film/Film"
import Spinner from "../../components/Spinner/Spinner"
import lowerWave from "../../res/pics/lowerWave.png"
import { useFetchMoviesQuery } from "../../store/apiSlices/movieApiSlice"
import { useGetUserByIdQuery } from "../../store/apiSlices/userApiSlice"
import { selectActualUser } from "../../store/slices/authSlice"
import s from "./AllFilms.module.css"

const AllFilms = () => {
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

export default AllFilms
